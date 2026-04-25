import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Counselors from "./pages/Counselors";
import Appointments from "./pages/Appointments";
import MyAppointments from "./pages/MyAppointments";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import CounselorLayout from "./pages/counselor/CounselorLayout";
import AuthorLayout from "./pages/author/AuthorLayout";
import { BlogList } from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import ClientProfile from "./pages/ClientProfile";
import "./App.css";

// ═══════════════════════════════════════════════════════════════
// 🎨 SVG Icons (Inline - آفلاین)
// ═══════════════════════════════════════════════════════════════

const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CalendarIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const ListIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" x2="21" y1="6" y2="6"/>
    <line x1="8" x2="21" y1="12" y2="12"/>
    <line x1="8" x2="21" y1="18" y2="18"/>
    <line x1="3" x2="3.01" y1="6" y2="6"/>
    <line x1="3" x2="3.01" y1="12" y2="12"/>
    <line x1="3" x2="3.01" y1="18" y2="18"/>
  </svg>
);

const BookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);

const ClipboardIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
);

const LayoutIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <line x1="3" x2="21" y1="9" y2="9"/>
    <line x1="9" x2="9" y1="21" y2="9"/>
  </svg>
);

const SettingsIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const LogOutIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

const MenuIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const XIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#E8F4F8" stroke="#3498DB" strokeWidth="2"/>
    <path d="M16 8v8l5 3" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="2" fill="#3498DB"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// 📋 NavButton Component
// ═══════════════════════════════════════════════════════════════

function NavButton({ icon, label, onClick, variant = "default" }) {
  return (
    <button
      style={{
        ...styles.navButton,
        ...(variant === "primary" ? styles.navButtonPrimary : {}),
        ...(variant === "outline" ? styles.navButtonOutline : {}),
        ...(variant === "ghost" ? styles.navButtonGhost : {}),
      }}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// 📋 MobileMenu Component
// ═══════════════════════════════════════════════════════════════

function MobileMenu({ isOpen, onClose, page, setPage, user, logout }) {
  if (!isOpen) return null;

  return (
    <>
      <div style={styles.mobileOverlay} onClick={onClose} />
      <div style={styles.mobileMenu}>
        <div style={styles.mobileMenuHeader}>
          <div style={styles.mobileLogo}>
            <LogoIcon />
            <span style={styles.mobileLogoText}>مشاوره آنلاین</span>
          </div>
          <button style={styles.mobileCloseBtn} onClick={onClose}>
            <XIcon size={24} />
          </button>
        </div>

        <div style={styles.mobileMenuContent}>
          {/* بدون احراز هویت */}
          {!user && (
            <>
              <button
                style={{
                  ...styles.mobileMenuItem,
                  ...(page === "login" ? styles.mobileMenuItemActive : {}),
                }}
                onClick={() => {
                  setPage("login");
                  onClose();
                }}
              >
                <UserIcon size={20} />
                <span>ورود</span>
              </button>
              <button
                style={{
                  ...styles.mobileMenuItem,
                  ...(page === "register" ? styles.mobileMenuItemActive : {}),
                }}
                onClick={() => {
                  setPage("register");
                  onClose();
                }}
              >
                <UserIcon size={20} />
                <span>ثبت‌نام</span>
              </button>
            </>
          )}

          {/* همه کاربران */}
          <button
            style={{
              ...styles.mobileMenuItem,
              ...(page === "counselors" ? styles.mobileMenuItemActive : {}),
            }}
            onClick={() => {
              setPage("counselors");
              onClose();
            }}
          >
            <ListIcon size={20} />
            <span>مشاورها</span>
          </button>

          <button
            style={{
              ...styles.mobileMenuItem,
              ...(page === "blog" ? styles.mobileMenuItemActive : {}),
            }}
            onClick={() => {
              setPage("blog");
              onClose();
            }}
          >
            <BookIcon size={20} />
            <span>وبلاگ</span>
          </button>

          {/* فقط کاربران client */}
          {user && user.user?.role === "client" && (
            <>
              <button
                style={{
                  ...styles.mobileMenuItem,
                  ...(page === "appointments" ? styles.mobileMenuItemActive : {}),
                }}
                onClick={() => {
                  setPage("appointments");
                  onClose();
                }}
              >
                <CalendarIcon size={20} />
                <span>رزرو وقت</span>
              </button>
              <button
                style={{
                  ...styles.mobileMenuItem,
                  ...(page === "myappointments" ? styles.mobileMenuItemActive : {}),
                }}
                onClick={() => {
                  setPage("myappointments");
                  onClose();
                }}
              >
                <ClipboardIcon size={20} />
                <span>نوبت‌های من</span>
              </button>
              <button
                style={{
                  ...styles.mobileMenuItem,
                  ...(page === "dashboard" ? styles.mobileMenuItemActive : {}),
                }}
                onClick={() => {
                  setPage("dashboard");
                  onClose();
                }}
              >
                <LayoutIcon size={20} />
                <span>داشبورد</span>
              </button>
            </>
          )}

          {/* پروفایل */}
          {user && (
            <button
              style={{
                ...styles.mobileMenuItem,
                ...(page === "profile" ? styles.mobileMenuItemActive : {}),
              }}
              onClick={() => {
                setPage("profile");
                onClose();
              }}
            >
              <SettingsIcon size={20} />
              <span>ویرایش پروفایل</span>
            </button>
          )}

          {/* پنل‌های مدیریت */}
          {user && user.user?.is_staff && (
            <button
              style={{
                ...styles.mobileMenuItem,
                ...(page === "admin" ? styles.mobileMenuItemActive : {}),
                ...styles.mobileMenuItemAdmin,
              }}
              onClick={() => {
                setPage("admin");
                onClose();
              }}
            >
              <SettingsIcon size={20} />
              <span>پنل ادمین</span>
            </button>
          )}

          {user && user.user?.role === "counselor" && (
            <button
              style={{
                ...styles.mobileMenuItem,
                ...(page === "counselor" ? styles.mobileMenuItemActive : {}),
              }}
              onClick={() => {
                setPage("counselor");
                onClose();
              }}
            >
              <SettingsIcon size={20} />
              <span>پنل مشاور</span>
            </button>
          )}

          {user && ["author", "counselor", "admin"].includes(user.user?.role) && (
            <button
              style={{
                ...styles.mobileMenuItem,
                ...(page === "author" ? styles.mobileMenuItemActive : {}),
              }}
              onClick={() => {
                setPage("author");
                onClose();
              }}
            >
              <BookIcon size={20} />
              <span>پنل نویسنده</span>
            </button>
          )}
        </div>

        {/* دکمه خروج */}
        {user && (
          <div style={styles.mobileMenuFooter}>
            <button style={styles.mobileLogoutBtn} onClick={logout}>
              <LogOutIcon size={20} />
              <span>خروج از حساب</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// 📋 Main App Component
// ═══════════════════════════════════════════════════════════════

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogin = (userData) => {
    setUser(userData);
    setPage("counselors");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div style={styles.appContainer}>
      {/* ─────────────────────────────────────────────────────────────
          Navigation Bar
          ───────────────────────────────────────────────────────────── */}
      <nav style={styles.navbar}>
        <div style={styles.navbarInner}>
          {/* Logo */}
          <div style={styles.logoSection}>
            <LogoIcon />
            <span style={styles.logoText}>مشاوره آنلاین</span>
          </div>

          {/* Desktop Navigation */}
          <div style={styles.desktopNav}>
            {/* بدون احراز هویت */}
            {!user && (
              <>
                <NavButton
                  icon={<UserIcon size={18} />}
                  label="ورود"
                  onClick={() => setPage("login")}
                />
                <NavButton
                  icon={<UserIcon size={18} />}
                  label="ثبت‌نام"
                  onClick={() => setPage("register")}
                  variant="primary"
                />
              </>
            )}

            {/* همه کاربران */}
            <NavButton
              icon={<ListIcon size={18} />}
              label="مشاورها"
              onClick={() => setPage("counselors")}
            />
            <NavButton
              icon={<BookIcon size={18} />}
              label="وبلاگ"
              onClick={() => setPage("blog")}
            />

            {/* فقط کاربران client */}
            {user && user.user?.role === "client" && (
              <>
                <NavButton
                  icon={<CalendarIcon size={18} />}
                  label="رزرو وقت"
                  onClick={() => setPage("appointments")}
                />
                <NavButton
                  icon={<ClipboardIcon size={18} />}
                  label="نوبت‌های من"
                  onClick={() => setPage("myappointments")}
                />
                <NavButton
                  icon={<LayoutIcon size={18} />}
                  label="داشبورد"
                  onClick={() => setPage("dashboard")}
                />
              </>
            )}

            {/* پروفایل */}
            {user && (
              <NavButton
                icon={<SettingsIcon size={18} />}
                label="ویرایش پروفایل"
                onClick={() => setPage("profile")}
              />
            )}

            {/* پنل‌های مدیریت */}
            {user && user.user?.is_staff && (
              <NavButton
                icon={<SettingsIcon size={18} />}
                label="پنل ادمین"
                onClick={() => setPage("admin")}
                variant="outline"
              />
            )}

            {user && user.user?.role === "counselor" && (
              <NavButton
                icon={<SettingsIcon size={18} />}
                label="پنل مشاور"
                onClick={() => setPage("counselor")}
                variant="outline"
              />
            )}

            {user && ["author", "counselor", "admin"].includes(user.user?.role) && (
              <NavButton
                icon={<BookIcon size={18} />}
                label="پنل نویسنده"
                onClick={() => setPage("author")}
                variant="outline"
              />
            )}

            {/* دکمه خروج */}
            {user && (
              <NavButton
                icon={<LogOutIcon size={18} />}
                label="خروج"
                onClick={logout}
                variant="ghost"
              />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            style={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        page={page}
        setPage={setPage}
        user={user}
        logout={logout}
      />

      {/* ─────────────────────────────────────────────────────────────
          Page Content
          ───────────────────────────────────────────────────────────── */}
      <main style={styles.mainContent}>
        {page === "login" && <Login onLogin={onLogin} />}
        {page === "register" && <Register />}
        {page === "counselors" && <Counselors />}
        {page === "blog" && <BlogList setPage={setPage} />}
        {page.startsWith("blogpost-") && (
          <BlogPost postId={page.replace("blogpost-", "")} />
        )}
        {page === "profile" && user && <ClientProfile />}
        {page === "appointments" && user && user.user?.role === "client" && <Appointments />}
        {page === "myappointments" && user && user.user?.role === "client" && <MyAppointments />}
        {page === "dashboard" && user && user.user?.role === "client" && <Dashboard setPage={setPage} />}
        {page === "admin" && user && user.user?.is_staff && <AdminLayout />}
        {page === "counselor" && user && user.user?.role === "counselor" && <CounselorLayout />}
        {page === "author" &&
          user &&
          ["author", "counselor", "admin"].includes(user.user?.role) &&
          <AuthorLayout />
        }
      </main>
    </div>
  );
}

export default App;

// ═══════════════════════════════════════════════════════════════
// 🎨 STYLES - Design System
// ═══════════════════════════════════════════════════════════════

const styles = {
  // ─────────────────────────────────────────────────────────────
  // App Container
  // ─────────────────────────────────────────────────────────────
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "#F8F9FA",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    direction: "rtl",
  },

  // ─────────────────────────────────────────────────────────────
  // Navbar
  // ─────────────────────────────────────────────────────────────
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid rgba(44, 62, 80, 0.08)",
    boxShadow: "0 2px 12px rgba(44, 62, 80, 0.06)",
  },
  navbarInner: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 24px",
    height: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Logo
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2C3E50",
    letterSpacing: "-0.3px",
  },

  // Desktop Navigation
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  // Navigation Button Base
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#5D6D7E",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  navButtonPrimary: {
    color: "#FFFFFF",
    backgroundColor: "#3498DB",
  },
  navButtonOutline: {
    color: "#3498DB",
    backgroundColor: "transparent",
    border: "2px solid #E8F4F8",
  },
  navButtonGhost: {
    color: "#D32F2F",
    backgroundColor: "transparent",
  },

  // Mobile Menu Toggle
  mobileMenuToggle: {
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    backgroundColor: "#F8F9FA",
    border: "none",
    borderRadius: "10px",
    color: "#2C3E50",
    cursor: "pointer",
  },

  // ─────────────────────────────────────────────────────────────
  // Mobile Menu
  // ─────────────────────────────────────────────────────────────
  mobileOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(44, 62, 80, 0.5)",
    zIndex: 200,
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "300px",
    maxWidth: "85vw",
    backgroundColor: "#FFFFFF",
    zIndex: 201,
    display: "flex",
    flexDirection: "column",
    boxShadow: "-4px 0 24px rgba(44, 62, 80, 0.15)",
  },
  mobileMenuHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid #F0F4F8",
  },
  mobileLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  mobileLogoText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2C3E50",
  },
  mobileCloseBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "#F8F9FA",
    border: "none",
    borderRadius: "10px",
    color: "#5D6D7E",
    cursor: "pointer",
  },
  mobileMenuContent: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 12px",
  },
  mobileMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    fontWeight: "500",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#5D6D7E",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "right",
  },
  mobileMenuItemActive: {
    color: "#3498DB",
    backgroundColor: "#E8F4F8",
  },
  mobileMenuItemAdmin: {
    color: "#9C27B0",
    backgroundColor: "#F3E5F5",
  },
  mobileMenuFooter: {
    padding: "16px",
    borderTop: "1px solid #F0F4F8",
  },
  mobileLogoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#D32F2F",
    backgroundColor: "#FDECEC",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },

  // ─────────────────────────────────────────────────────────────
  // Main Content
  // ─────────────────────────────────────────────────────────────
  mainContent: {
    minHeight: "calc(100vh - 68px)",
  },
};