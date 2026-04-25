import { useState } from "react";
import "./CounselorLayout.css";
import CounselorAppointments from "./CounselorAppointments";
import CounselorProfile from "./CounselorProfile";
import CounselorDashboard from "./CounselorDashboard";

function CounselorLayout() {
  const [page, setPage] = useState("appointments");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  if (user?.role !== "counselor") {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f0f4f8',
        fontFamily: 'Vazirmatn, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px 60px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ color: '#e53e3e', marginBottom: '8px' }}>دسترسی غیرمجاز</h2>
          <p style={{ color: '#718096' }}>شما اجازه دسترسی به این بخش را ندارید.</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { key: "dashboard", label: "داشبورد من", icon: "📊" },
    { key: "appointments", label: "نوبت‌های من", icon: "📅" },
    { key: "profile", label: "پروفایل من", icon: "👤" },
  ];

  return (
    <div className="counselor-layout">
      {/* ─── هدر ─── */}
      <header className="counselor-header">
        <h1>پنل مشاور</h1>
        <div className="header-actions">
          <div className="user-badge">
            <div className="user-avatar">👨‍⚕️</div>
            <span>{user?.name || "مشاور"}</span>
          </div>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            خروج
          </button>
        </div>
      </header>

      {/* ─── ناوبری ─── */}
      <nav className="counselor-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-btn ${page === item.key ? "active" : ""}`}
            onClick={() => setPage(item.key)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ─── محتوا ─── */}
      <main className="counselor-main">
        {page === "dashboard" && (
          <div className="page-animate">
            <CounselorDashboard />
          </div>
        )}
        {page === "appointments" && (
          <div className="page-animate">
            <CounselorAppointments />
          </div>
        )}
        {page === "profile" && (
          <div className="page-animate">
            <CounselorProfile />
          </div>
        )}
      </main>
    </div>
  );
}

export default CounselorLayout;