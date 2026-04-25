import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

export default function Dashboard({ setPage }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("appointments/"),
      api.get("profile/").catch(() => ({ data: null })),
    ])
      .then(([appointmentsRes, profileRes]) => {
        setAppointments(appointmentsRes.data);
        setProfile(profileRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ─── محاسبه آمار ───
  const total = appointments.length;
  const upcoming = appointments.filter(
    (a) => new Date(a.start_time) > new Date()
  );
  const completed = appointments.filter((a) => a.status === "completed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  // ─── تبدیل تاریخ ───
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ─── ساعت روز ───
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 صبح بخیر";
    if (hour < 17) return "☀️ عصر بخیر";
    return "🌙 شب بخیر";
  };

  // ─── حالت بارگذاری ───
  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="dashboard-header">
          <div className="welcome-section">
            <div className="skeleton-line" style={{ width: 200, height: 35, marginBottom: 10 }} />
            <div className="skeleton-line" style={{ width: 150, height: 20 }} />
          </div>
        </div>
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line" style={{ width: 60, height: 60, borderRadius: 14 }} />
              <div>
                <div className="skeleton-line" style={{ width: 60, height: 30, marginBottom: 8 }} />
                <div className="skeleton-line" style={{ width: 80, height: 16 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      {/* ─── هدر ─── */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>{getGreeting()}، {user?.first_name || user?.username || "کاربر"}!</h1>
          <p>به پنل کاربری مرکز مشاوره خوش آمدید</p>
        </div>
        <div className="quick-actions-header">
          <button
            className="btn-quick-action primary"
            onClick={() => setPage("appointments")}
          >
            📅 رزرو نوبت جدید
          </button>
          <button
            className="btn-quick-action secondary"
            onClick={() => setPage("counselors")}
          >
            👨‍⚕️ مشاوران
          </button>
        </div>
      </div>

      {/* ─── کارت پروفایل ─── */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <div className="profile-info">
            <h3>{user?.first_name || user?.username || "کاربر"}</h3>
            <p>کاربر مرکز مشاوره</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <label>📧 ایمیل</label>
            <span>{user?.email || "-"}</span>
          </div>
          <div className="profile-item">
            <label>📱 شماره تماس</label>
            <span>{profile?.phone || "ثبت نشده"}</span>
          </div>
          <div className="profile-item">
            <label>🎂 سن</label>
            <span>{profile?.age ? `${profile.age} سال` : "ثبت نشده"}</span>
          </div>
          <div className="profile-item">
            <label>📅 تاریخ عضویت</label>
            <span>
              {user?.date_joined
                ? new Date(user.date_joined).toLocaleDateString("fa-IR")
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* ─── آمار سریع ─── */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <div className="stat-value">{total}</div>
            <div className="stat-label">کل نوبت‌ها</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon upcoming">📅</div>
          <div className="stat-content">
            <div className="stat-value">{upcoming.length}</div>
            <div className="stat-label">نوبت‌های آینده</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <div className="stat-value">{completed.length}</div>
            <div className="stat-label">نوبت‌های انجام شده</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cancelled">❌</div>
          <div className="stat-content">
            <div className="stat-value">{cancelled.length}</div>
            <div className="stat-label">نوبت‌های لغو شده</div>
          </div>
        </div>
      </div>

      {/* ─── محتوای اصلی ─── */}
      <div className="dashboard-content">
        {/* بخش نوبت‌های آینده */}
        <div className="upcoming-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="icon">📅</span>
              نوبت‌های پیش رو
            </h2>
            <button
              className="view-all-btn"
              onClick={() => setPage("appointments")}
            >
              مشاهده همه ←
            </button>
          </div>

          {upcoming.length > 0 ? (
            upcoming.slice(0, 4).map((a) => (
              <div key={a.id} className="upcoming-item">
                <div className="upcoming-icon">🗓️</div>
                <div className="upcoming-info">
                  <h4>{a.counselor_name || a.counselor || "مشاور"}</h4>
                  <p>
                    <span>📅</span>
                    {formatDate(a.start_time)} | ساعت {formatTime(a.start_time)}
                  </p>
                </div>
                <span className={`upcoming-status ${a.status}`}>
                  {a.status === "pending" ? "در انتظار" : "تأیید شده"}
                </span>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h4>هنوز نوبتی ندارید</h4>
              <p>برای رزرو نوبت با مشاور مورد نظرتان اقدام کنید.</p>
              <button
                className="btn-empty-action"
                onClick={() => setPage("appointments")}
              >
                رزرو نوبت
              </button>
            </div>
          )}
        </div>

        {/* سایدبار */}
        <div className="sidebar-cards">
          {/* دسترسی سریع */}
          <div className="quick-access-card">
            <div className="section-header" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 15 }}>
              <h2 className="section-title">
                <span className="icon">⚡</span>
                دسترسی سریع
              </h2>
            </div>
            <div className="quick-links">
              <div className="quick-link" onClick={() => setPage("appointments")}>
                <span className="icon">📅</span>
                <span>نوبت‌های من</span>
              </div>
              <div className="quick-link" onClick={() => setPage("counselors")}>
                <span className="icon">👨‍⚕️</span>
                <span>مشاوران</span>
              </div>
              <div className="quick-link" onClick={() => setPage("blog")}>
                <span className="icon">📝</span>
                <span>وبلاگ</span>
              </div>
              <div className="quick-link" onClick={() => setPage("profile")}>
                <span className="icon">👤</span>
                <span>پروفایل من</span>
              </div>
            </div>
          </div>

          {/* نکته روز */}
          <div className="tip-card">
            <h4>💡 نکته روز</h4>
            <p>
              صحبت کردن درباره احساسات یکی از بهترین راه‌ها برای
              حفظ سلامت روان است. از گفتگو با افراد مورد اعتماد
              نترسید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}