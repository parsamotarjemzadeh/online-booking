import React, { useEffect, useState } from "react";
import api from "../services/api";

// ═══════════════════════════════════════════════════════════════
// 🎨 SVG Icons (Inline - آفلاین، بدون نیاز به نصب پکیج)
// ═══════════════════════════════════════════════════════════════

const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const FileTextIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" x2="8" y1="13" y2="13"/>
    <line x1="16" x2="8" y1="17" y2="17"/>
    <line x1="10" x2="8" y1="9" y2="9"/>
  </svg>
);

const SaveIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const ArrowRightIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" x2="19" y1="12" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const AlertCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// 📋 Main Component
// ═══════════════════════════════════════════════════════════════

export default function ClientProfile({ setPage }) {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    bio: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get("profile/edt/")
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const saveProfile = () => {
    setSaving(true);
    setMessage(null);
    api.patch("profile/edt/", {
      username: profile.username,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name
    })
      .then(() => {
        setMessage({ type: "success", text: "پروفایل با موفقیت بروزرسانی شد" });
        setSaving(false);
      })
      .catch(err => {
        console.error("Saving error:", err);
        setMessage({ type: "error", text: "خطا در ذخیره پروفایل" });
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.headerSection}>
        <div style={styles.headerIcon}>
          <UserIcon size={28} color="#2C3E50" />
        </div>
        <div>
          <h1 style={styles.pageTitle}>ویرایش پروفایل</h1>
          <p style={styles.pageSubtitle}>اطلاعات شخصی خود را مدیریت کنید</p>
        </div>
      </div>

      {/* Message Toast */}
      {message && (
        <div style={{
          ...styles.messageToast,
          backgroundColor: message.type === "success" ? "#E8F8EF" : "#FDECEC",
          borderRight: `4px solid ${message.type === "success" ? "#2E7D32" : "#D32F2F"}`
        }}>
          {message.type === "success" ? (
            <CheckCircleIcon size={20} color="#2E7D32" />
          ) : (
            <AlertCircleIcon size={20} color="#D32F2F" />
          )}
          <span style={{
            ...styles.messageText,
            color: message.type === "success" ? "#2E7D32" : "#D32F2F"
          }}>
            {message.text}
          </span>
        </div>
      )}

      {/* Profile Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>اطلاعات کاربری</h2>
        </div>

        <div style={styles.formGrid}>
          {/* Username */}
          <div style={styles.inputGroup} className="profile-full-width">
            <label style={styles.label}>
              <UserIcon size={16} color="#5D6D7E" />
              نام کاربری
            </label>
            <input
              style={styles.input}
              value={profile.username}
              onChange={e => setProfile({ ...profile, username: e.target.value })}
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>

          {/* Email */}
          <div style={styles.inputGroup} className="profile-full-width">
            <label style={styles.label}>
              <MailIcon size={16} color="#5D6D7E" />
              ایمیل
            </label>
            <input
              style={styles.input}
              type="email"
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>

          {/* First Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>نام</label>
            <input
              style={styles.input}
              value={profile.first_name}
              onChange={e => setProfile({ ...profile, first_name: e.target.value })}
              placeholder="نام خود را وارد کنید"
            />
          </div>

          {/* Last Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>نام خانوادگی</label>
            <input
              style={styles.input}
              value={profile.last_name}
              onChange={e => setProfile({ ...profile, last_name: e.target.value })}
              placeholder="نام خانوادگی خود را وارد کنید"
            />
          </div>

          {/* Phone */}
          <div style={styles.inputGroup} className="profile-full-width">
            <label style={styles.label}>
              <PhoneIcon size={16} color="#5D6D7E" />
              شماره موبایل
            </label>
            <input
              style={styles.input}
              value={profile.phone}
              onChange={e => setProfile({ ...profile, phone: e.target.value })}
              placeholder="شماره موبایل خود را وارد کنید"
            />
          </div>

          {/* Bio */}
          <div style={styles.inputGroup} className="profile-full-width">
            <label style={styles.label}>
              <FileTextIcon size={16} color="#5D6D7E" />
              بیوگرافی
            </label>
            <textarea
              style={styles.textarea}
              value={profile.bio}
              onChange={e => setProfile({ ...profile, bio: e.target.value })}
              placeholder="درباره خودتان بنویسید..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.saveBtn,
            ...(saving ? styles.saveBtnDisabled : {})
          }}
          onClick={saveProfile}
          disabled={saving}
        >
          {saving ? (
            <>
              <div style={styles.btnSpinner}></div>
              در حال ذخیره...
            </>
          ) : (
            <>
              <SaveIcon size={18} color="#ffffffff" />
              ذخیره تغییرات
            </>
          )}
        </button>

        <button style={styles.backBtn} onClick={() => setPage("dashboard")}>
          <ArrowRightIcon size={18} color="#5D6D7E" />
          بازگشت به داشبورد
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🎨 STYLES - Design System
// ═══════════════════════════════════════════════════════════════

const styles = {
  // Container & Layout
  wrapper: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "32px 24px",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    direction: "rtl",
  },

  // Header Section
  headerSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  headerIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    backgroundColor: "#E8F4F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(44, 62, 80, 0.08)",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2C3E50",
    margin: "0 0 4px 0",
    letterSpacing: "-0.3px",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#5D6D7E",
    margin: "0",
    fontWeight: "400",
  },

  // Message Toast
  messageToast: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    borderRadius: "12px",
    marginBottom: "24px",
    transition: "all 0.3s ease",
  },
  messageText: {
    fontSize: "14px",
    fontWeight: "500",
  },

  // Card
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
    boxShadow: "0 4px 20px rgba(44, 62, 80, 0.06)",
    border: "1px solid rgba(44, 62, 80, 0.06)",
  },
  cardHeader: {
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #F0F4F8",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2C3E50",
    margin: "0",
  },

  // Form Grid
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },

  // Form Elements
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#5D6D7E",
    transition: "color 0.2s ease",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#2C3E50",
    backgroundColor: "#F8F9FA",
    border: "2px solid transparent",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#2C3E50",
    backgroundColor: "#F8F9FA",
    border: "2px solid transparent",
    borderRadius: "12px",
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  },

  // Buttons
  buttonGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#FFFFFF",
    backgroundColor: "#3498DB",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 4px 12px rgba(52, 152, 219, 0.25)",
  },
  saveBtnDisabled: {
    backgroundColor: "#A0C4E8",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "500",
    fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
    color: "#5D6D7E",
    backgroundColor: "#ffffffff",
    border: "2px solid #E8EDF2",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  btnSpinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#FFFFFF",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  // Loading State
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    gap: "16px",
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #bcdde7ff",
    borderTopColor: "#3498DB",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: "15px",
    color: "#5D6D7E",
    margin: "0",
  },
};