import { useState, useEffect } from "react";
import "./AdminLayout.css";

import AdminDashboard from "./AdminDashboard";
import ManageUsers from "./ManageUsers";
import ManageCounselors from "./ManageCounselors";
import ManageAppointments from "./ManageAppointments";

export default function AdminLayout() {
  const [page, setPage] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    {
      section: "اصلی",
      items: [
        { key: "dashboard", label: "داشبورد", icon: "📊", badge: null },
      ],
    },
    {
      section: "مدیریت",
      items: [
        { key: "users", label: "مدیریت کاربران", icon: "👥", badge: null },
        { key: "counselors", label: "مدیریت مشاورها", icon: "👨‍⚕️", badge: null },
        { key: "appointments", label: "مدیریت نوبت‌ها", icon: "📅", badge: "۵" },
      ],
    },
  ];

  const pageTitles = {
    dashboard: "داشبورد",
    users: "مدیریت کاربران",
    counselors: "مدیریت مشاورها",
    appointments: "مدیریت نوبت‌ها",
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <ManageUsers />;
      case "counselors":
        return <ManageCounselors />;
      case "appointments":
        return <ManageAppointments />;
      default:
        return <AdminDashboard />;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("fa-IR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="admin-layout">
      {/* ─── سایدبار ─── */}
      <aside className="admin-sidebar">
        {/* هدر */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">⚙️</div>
            <span className="logo-text">مدیریت</span>
          </div>
          <p className="sidebar-subtitle">پنل ادمین مرکز مشاوره</p>
        </div>

        {/* ناوبری */}
        <nav className="sidebar-nav">
          {navItems.map((section, idx) => (
            <div key={idx} className="nav-section">
              <div className="nav-section-title">{section.section}</div>
              {section.items.map((item) => (
                <button
                  key={item.key}
                  className={`nav-item ${page === item.key ? "active" : ""}`}
                  onClick={() => setPage(item.key)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* فوتر */}
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">👤</div>
            <div className="admin-details">
              <h4>مدیر سیستم</h4>
              <span>ادمین اصلی</span>
            </div>
          </div>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            <span>🚪</span>
            خروج از پنل
          </button>
        </div>
      </aside>

      {/* ─── بخش محتوا ─── */}
      <div className="admin-content">
        {/* تاپ‌بار */}
        <header className="admin-topbar">
          <div className="topbar-right">
            <h1 className="page-title">{pageTitles[page]}</h1>
          </div>
          <div className="topbar-left">
            <div className="topbar-time">
              <span>🕐</span>
              <span>{formatTime(currentTime)}</span>
              <span style={{ margin: "0 5px", color: "#ddd" }}>|</span>
              <span>{formatDate(currentTime)}</span>
            </div>
            <button className="topbar-icon-btn">
              <span>🔔</span>
              <span className="notification-dot"></span>
            </button>
            <button className="topbar-icon-btn">
              <span>⚙️</span>
            </button>
          </div>
        </header>

        {/* صفحه اصلی */}
        <main className="admin-main">
          <div className="page-animate" key={page}>
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}