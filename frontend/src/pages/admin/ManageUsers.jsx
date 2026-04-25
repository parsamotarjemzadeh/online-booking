import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("admin/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("آیا مطمئن هستید؟")) return;

    await api.delete(`admin/users/${id}/`);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleRoleChange = async (userId, newRole) => {
      try {
          await api.put(`admin/users/${userId}/role/`, {
              role: newRole
          });

          setUsers(prev =>
              prev.map(u =>
                  u.id === userId ? { ...u, role: newRole } : u
              )
          );
      } catch (err) {
          console.error(err);
          alert("خطا در تغییر نقش");
      }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">مدیریت کاربران</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">شناسه</th>
            <th className="p-2">نام کاربری</th>
            <th className="p-2">ایمیل</th>
            <th className="p-2">نقش</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                {u.role === "admin" ? (
                  <span className="font-bold text-blue-600">ادمین</span>
                ) : (
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="client">کلاینت</option>
                    <option value="counselor">مشاور</option>
                    <option value="author">نویسنده</option>
                  </select>
                )}
              </td>
              <td className="p-2">
                {u.role !== "admin" ? (
                
                <button 
                  className="text-red-600" 
                  onClick={() => deleteUser(u.id)}
                >
                  حذف
                </button> ) : (<span className="font-bold text-blue-600">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
