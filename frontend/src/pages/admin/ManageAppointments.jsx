import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("admin/appointments/")
      .then(res => setAppointments(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`admin/appointments/${id}/`, { status });
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status } : a)
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">مدیریت نوبت‌ها</h1>

      <table className="w-full bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">کاربر</th>
            <th className="p-2">مشاور</th>
            <th className="p-2">تاریخ</th>
            <th className="p-2">وضعیت</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(a => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.client}</td>
              <td className="p-2">{a.counselor}</td>
              <td className="p-2">{a.start_time}</td>
              <td className="p-2">
                {a.status === "done" && " انجام شد"}
                {a.status === "canceled" && " کنسل شده"}
                {a.status === "pending" && " در انتظار"}
                {a.status === "confirmed" && " تایید شده"}
              </td>
              <td className="p-2 flex gap-2">
              {a.status === "pending" && (
                
                <button 
                  onClick={() => updateStatus(a.id, "done")} 
                  className="text-green-600"
                >
                  انجام شد
                </button>
              )}
              {a.status === "pending" && (
                <button 
                  onClick={() => updateStatus(a.id, "canceled")} 
                  className="text-red-600"
                >
                  لغو
                </button>
              )}

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
