import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CounselorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const markAsDone = async (id) => {
        try {
            await api.put(`/counselor/appointments/${id}/done/`);
            setAppointments((prev) =>
                prev.map((a) =>
                    a.id === id ? { ...a, status: "done" } : a
                )
            );
        } catch (err) {
            console.error(err);
        }
    };


    const cancelAppointment = async (id) => {
        try {
            await api.put(`/counselor/appointments/${id}/cancel/`);
            setAppointments((prev) =>
                prev.map((a) =>
                    a.id === id ? { ...a, status: "canceled" } : a
                )
            );
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        api.get("/counselor/appointments/")
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">نوبت‌های من (مشاور)</h1>

            {appointments.length === 0 ? (
                <p>هیچ نوبتی ثبت نشده است.</p>
            ) : (
                <div className="space-y-4">
                    {appointments.map((a) => (
                        <div key={a.id} className="p-5 border rounded flex justify-between">

                            <div>
                                <p>مراجع: <b>{a.client_name}</b></p>
                                <p>تاریخ: {a.start_time}</p>
                                <p>وضعیت: 
                                    {a.status === "done" && " انجام شد"}
                                    {a.status === "canceled" && " کنسل شده"}
                                    {a.status === "pending" && " در انتظار"}
                                    {a.status === "confirmed" && " تایید شده"}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                {a.status !== "done" && a.status !== "canceled" && (
                                    <>
                                        <button
                                            onClick={() => markAsDone(a.id)}
                                            className="px-3 py-1 bg-green-600 text-white rounded"
                                        >
                                            انجام شد
                                        </button>

                                        <button
                                            onClick={() => cancelAppointment(a.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            کنسل شد
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}