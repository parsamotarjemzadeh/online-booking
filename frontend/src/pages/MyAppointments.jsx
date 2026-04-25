import { useEffect, useState } from "react";
import api from "../services/api";
import "./MyAppointments.css";

export default function MyAppointments({ setPage }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("appointments/")
      .then((res) => {
        const mine = res.data.filter((a) => a.client == user.id);
        setAppointments(mine);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ─── فیلتر نوبت‌ها ───
  const filteredAppointments = appointments.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  // ─── تبدیل وضعیت به فارسی ───
  const statusLabels = {
    pending: "در انتظار تأیید",
    confirmed: "تأیید شده",
    completed: "انجام شده",
    cancelled: "لغو شده",
  };

  // ─── آیکون وضعیت ───
  const statusIcons = {
    pending: "⏳",
    confirmed: "✅",
    completed: "🎉",
    cancelled: "❌",
  };

  // ─── فرمت تاریخ ───
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ─── لغو نوبت ───
  const handleCancel = (id) => {
    if (window.confirm("آیا از لغو این نوبت مطمئن هستید؟")) {
      api.patch(`appointments/${id}/`, { status: "cancelled" })
        .then(() => {
          setAppointments((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
          );
        })
        .catch((err) => console.error(err));
    }
  };

  // ─── حالت بارگذاری ───
  if (loading) {
    return (
      <div className="my-appointments">
        <div className="appointments-header">
          <h1 className="appointments-title">نوبت‌های من</h1>
          <p className="appointments-subtitle">لیست تمام نوبت‌های رزرو شده شما</p>
        </div>
        <div className="appointments-loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line" style={{ width: 60, height: 60, borderRadius: 14 }} />
              <div>
                <div className="skeleton-line" style={{ width: "60%", height: 20, marginBottom: 10 }} />
                <div className="skeleton-line" style={{ width: "40%", height: 16 }} />
              </div>
              <div className="skeleton-line" style={{ width: 80, height: 30, borderRadius: 30 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── حالت خالی ───
  if (appointments.length === 0) {
    return (
      <div className="my-appointments">
        <div className="appointments-empty">
          <div className="empty-icon">📅</div>
          <h2 className="empty-title">هنوز نوبتی رزرو نکرده‌اید</h2>
          <p className="empty-text">
            شما هنوز هیچ نوبتی با مشاوران ما ثبت نکرده‌اید.
            <br />
            برای شروع، یک نوبت جدید رزرو کنید.
          </p>
          <button
            className="btn-book"
            onClick={() => setPage && setPage("booking")}
          >
            رزرو نوبت جدید
          </button>
        </div>
      </div>
    );
  }

  // ─── نمایش لیست نوبت‌ها ───
  return (
    <div className="my-appointments">
      <div className="appointments-header">
        <h1 className="appointments-title">نوبت‌های من</h1>
        <p className="appointments-subtitle">
          لیست تمام نوبت‌های رزرو شده شما نزد مشاوران مرکز
        </p>
      </div>

      <div className="appointments-container">
        {/* فیلتر و ابزار */}
        <div className="appointments-toolbar">
          <div className="filter-tabs">
            {["all", "pending", "confirmed", "completed", "cancelled"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`filter-tab ${filter === tab ? "active" : ""}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab === "all"
                    ? "همه"
                    : statusLabels[tab]}
                </button>
              )
            )}
          </div>
          <div className="appointments-count">
            تعداد نوبت‌ها: <strong>{filteredAppointments.length}</strong>
          </div>
        </div>

        {/* لیست نوبت‌ها */}
        {filteredAppointments.map((a) => (
          <div
            key={a.id}
            className={`appointment-card status-${a.status}`}
          >
            {/* آیکون */}
            <div className="appointment-icon">
              {statusIcons[a.status]}
            </div>

            {/* اطلاعات */}
            <div className="appointment-info">
              <div className="appointment-counselor">
                <div className="counselor-avatar">👨‍⚕️</div>
                <div>
                  <h3 className="counselor-name">
                    {a.counselor?.full_name || "مشاور"}
                  </h3>
                  <span className="counselor-role">مشاور مرکز مشاوره</span>
                </div>
              </div>

              <div className="appointment-time">
                <div className="time-item">
                  <span className="icon">📅</span>
                  <div>
                    <span className="time-label">تاریخ</span>
                    <br />
                    {formatDate(a.start_time)}
                  </div>
                </div>
                <div className="time-item">
                  <span className="icon">🕐</span>
                  <div>
                    <span className="time-label">ساعت</span>
                    <br />
                    {formatTime(a.start_time)} - {formatTime(a.end_time)}
                  </div>
                </div>
                <div className="time-item">
                  <span className="icon">⏱️</span>
                  <div>
                    <span className="time-label">مدت</span>
                    <br />
                    {a.duration || "۵۰"} دقیقه
                  </div>
                </div>
              </div>
            </div>

            {/* اکشن‌ها */}
            <div className="appointment-actions">
              <span className="status-badge">
                {statusIcons[a.status]} {statusLabels[a.status]}
              </span>

              {a.status === "pending" || a.status === "confirmed" ? (
                <button
                  className="btn-cancel"
                  onClick={() => handleCancel(a.id)}
                >
                  ❌ لغو نوبت
                </button>
              ) : null}

              <button className="btn-details">
                📋 جزئیات
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}