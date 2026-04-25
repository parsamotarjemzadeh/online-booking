import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("admin/stats/")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!stats) return <p>در حال بارگذاری...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-lg font-bold">کاربران</h3>
        <p className="text-2xl mt-2">{stats.users}</p>
      </div>

      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-lg font-bold">مشاوران</h3>
        <p className="text-2xl mt-2">{stats.counselors}</p>
      </div>

      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-lg font-bold">نوبت‌ها</h3>
        <p className="text-2xl mt-2">{stats.appointments}</p>
      </div>

    </div>
  );
}
