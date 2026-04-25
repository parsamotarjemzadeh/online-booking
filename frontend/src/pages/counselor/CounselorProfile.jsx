import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CounselorProfile() {
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get("/counselor/profile/").then(res => {
      setForm(res.data);
    });
  }, []);

  const saveProfile = () => {
    api.put("/counselor/profile/", form).then(() => {
      alert("ذخیره شد");
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-5 rounded shadow">
      <h2 className="text-xl mb-4">پروفایل مشاور</h2>

      <input className="input" placeholder="نام" 
        value={form.first_name || ""} 
        onChange={e => setForm({...form, first_name: e.target.value})} />

      <input className="input" placeholder="نام خانوادگی" 
        value={form.last_name || ""} 
        onChange={e => setForm({...form, last_name: e.target.value})} />

      <input className="input" placeholder="تلفن" 
        value={form.phone || ""} 
        onChange={e => setForm({...form, phone: e.target.value})} />

      <textarea className="input" placeholder="بیو"
        value={form.bio || ""}
        onChange={e => setForm({...form, bio: e.target.value})} />

      <textarea className="input" placeholder="تخصص‌ها"
        value={form.specialties || ""}
        onChange={e => setForm({...form, specialties: e.target.value})} />

      <textarea className="input" placeholder="رزومه"
        value={form.resume || ""}
        onChange={e => setForm({...form, resume: e.target.value})} />

      <button className="btn" onClick={saveProfile}>ذخیره</button>
    </div>
  );
}
