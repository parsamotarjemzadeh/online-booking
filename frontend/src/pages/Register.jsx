import { useState } from "react";
import api from "../services/api";
import "./Register.css";

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  // ─── قدرت رمز عبور ───
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const levels = ["weak", "medium", "strong"];
    const texts = {
      weak: "رمز عبور ضعیف",
      medium: "رمز عبور متوسط",
      strong: "رمز عبور قوی",
    };

    return {
      level: strength,
      text: texts[levels[strength - 1] || "weak"],
      class: levels[Math.min(strength - 1, 2)] || "weak",
    };
  };

  const passwordStrength = getPasswordStrength(form.password);

  // ─── اعتبارسنجی ───
  const validateForm = () => {
    if (!form.username.trim()) {
      setError("لطفاً نام کاربری را وارد کنید.");
      return false;
    }
    if (form.username.length < 3) {
      setError("نام کاربری باید حداقل ۳ کاراکتر باشد.");
      return false;
    }
    if (!form.email.trim()) {
      setError("لطفاً ایمیل را وارد کنید.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("فرمت ایمیل صحیح نیست.");
      return false;
    }
    if (!form.password) {
      setError("لطفاً رمز عبور را وارد کنید.");
      return false;
    }
    if (form.password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("تکرار رمز عبور مطابقت ندارد.");
      return false;
    }
    if (!agreed) {
      setError("لطفاً قوانین و مقررات را بپذیرید.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await api.post("register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      setSuccess(true);

      // انتقال به لاگین بعد از ۲ ثانیه
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2500);
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.username) {
        setError("این نام کاربری قبلاً استفاده شده است.");
      } else if (errData?.email) {
        setError("این ایمیل قبلاً ثبت شده است.");
      } else if (errData?.error) {
        setError(errData.error);
      } else {
        setError("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── حالت موفقیت ───
  if (success) {
    return (
      <div className="register-page">
        <div className="register-card">
          <div className="success-message" style={{ textAlign: "center", flexDirection: "column", padding: "40px 30px" }}>
            <span style={{ fontSize: "4rem", marginBottom: "15px" }}>✅</span>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "1.3rem" }}>ثبت‌نام موفقیت‌آمیز!</h3>
            <p style={{ margin: 0, color: "#718096" }}>
              حساب کاربری شما با موفقیت ایجاد شد.
              <br />
              در حال انتقال به صفحه ورود...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-card">
        {/* ─── هدر ─── */}
        <div className="register-header">
          <div className="register-logo">📝</div>
          <h1>ثبت‌نام در سایت</h1>
          <p>حساب کاربری جدید برای شما ایجاد کنید</p>
        </div>

        {/* ─── فرم ─── */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* پیام خطا */}
          {error && (
            <div className="error-message">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* نام کاربری */}
          <div className="form-group">
            <label className="form-label">نام کاربری</label>
            <div className="form-input-wrapper">
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="نام کاربری دلخواه"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          {/* ایمیل */}
          <div className="form-group">
            <label className="form-label">ایمیل</label>
            <div className="form-input-wrapper">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="example@domain.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          {/* رمز عبور */}
          <div className="form-group">
            <label className="form-label">رمز عبور</label>
            <div className="form-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-input"
                placeholder="رمز عبور (حداقل ۸ کاراکتر)"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <span
                className="input-icon"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* نوار قدرت رمز */}
            {form.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className={`strength-fill ${passwordStrength.class}`} />
                </div>
                <span className={`strength-text ${passwordStrength.class}`}>
                  {passwordStrength.text}
                </span>
              </div>
            )}
          </div>

          {/* تکرار رمز عبور */}
          <div className="form-group">
            <label className="form-label">تکرار رمز عبور</label>
            <div className="form-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className={`form-input ${
                  form.confirmPassword && form.password !== form.confirmPassword
                    ? "error"
                    : ""
                }`}
                placeholder="رمز عبور را مجدداً وارد کنید"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <span className="input-icon">
                {form.confirmPassword && form.password === form.confirmPassword
                  ? "✅"
                  : "🔒"}
              </span>
            </div>
          </div>

          {/* قوانین */}
          <div className="terms-agreement">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree">
              با{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                قوانین و مقررات
              </a>{" "}
              و{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                حریم خصوصی
              </a>{" "}
              موافقم.
            </label>
          </div>

          {/* دکمه ثبت‌نام */}
          <button
            type="submit"
            className={`btn-register ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {!loading && (
              <>
                <span>✨</span>
                ایجاد حساب کاربری
              </>
            )}
          </button>
        </form>

        {/* ─── نکات امنیتی ─── */}
        <div className="security-tips">
          <h4>🔐 نکات امنیتی</h4>
          <ul>
            <li>رمز عبور حداقل ۸ کاراکتر باشد</li>
            <li>ترکیبی از حروف بزرگ و کوچک</li>
            <li>استفاده از اعداد و نمادها</li>
            <li>هرگز رمز را با دیگران به اشتراک نگذارید</li>
          </ul>
        </div>

        {/* ─── لینک ورود ─── */}
        <div className="login-link">
          <p>
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              ورود به حساب
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}