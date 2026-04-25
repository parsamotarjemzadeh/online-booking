import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageCounselors() {
  const [counselors, setCounselors] = useState([]);

  useEffect(() => {
    api.get("admin/counselors/")
      .then(res => setCounselors(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">آمار نوبت مشاوران</h1>

      <table className="w-full bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">نام مشاور</th>
            <th className="p-2">در انتظار</th>
            <th className="p-2">انجام شده</th>
            <th className="p-2">کنسل شده</th>
            <th className="p-2">جمع کل</th>
          </tr>
        </thead>

        <tbody>
          {counselors.map(c => (
            <tr key={c.id} className="border-t text-center">
              <td className="p-2">{c.username}</td>
              <td className="p-2 text-yellow-600">{c.pending}</td>
              <td className="p-2 text-green-600">{c.done}</td>
              <td className="p-2 text-red-600">{c.cancelled}</td>
              <td className="p-2 font-bold">
                {c.pending + c.done + c.cancelled}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
