import { useState } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // پاک کردن خطا هنگام تایپ
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی
    if (!form.username.trim()) {
      setError("لطفاً نام کاربری را وارد کنید.");
      return;
    }
    if (!form.password) {
      setError("لطفاً رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post("login/", form);

      // ذخیره اطلاعات
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      // ذخیره برای یادآوری
      if (remember) {
        localStorage.setItem("remember_username", form.username);
      } else {
        localStorage.removeItem("remember_username");
      }

      onLogin(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("نام کاربری یا رمز عبور اشتباه است.");
      } else if (err.response?.status === 403) {
        setError("حساب کاربری شما غیرفعال است.");
      } else {
        setError("خطا در برقراری ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  // خواندن یادآوری
  const savedUsername = localStorage.getItem("remember_username");
  if (savedUsername && !form.username) {
    setForm((prev) => ({ ...prev, username: savedUsername }));
    setRemember(true);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* ─── هدر ─── */}
        <div className="login-header">
          <div className="login-logo">🏥</div>
          <h1>ورود به سیستم</h1>
          <p>به پنل مرکز مشاوره خوش آمدید</p>
        </div>

        {/* ─── فرم ─── */}
        <form className="login-form" onSubmit={handleSubmit}>
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
                placeholder="نام کاربری خود را وارد کنید"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                autoFocus
              />
              <span className="input-icon">👤</span>
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
                placeholder="رمز عبور خود را وارد کنید"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <span
                className="input-icon"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* یادآوری و فراموشی رمز */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              یادآوری من
            </label>
            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
              فراموشی رمز عبور؟
            </a>
          </div>

          {/* دکمه ورود */}
          <button
            type="submit"
            className={`btn-login ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {!loading && (
              <>
                <span>🔐</span>
                ورود به حساب کاربری
              </>
            )}
          </button>
        </form>

        {/* ─── ثبت‌نام ─── */}
        <div className="signup-link">
          <p>
            حساب کاربری ندارید؟{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              ثبت‌نام در سایت
            </a>
          </p>
        </div>

        {/* ─── امنیت ─── */}
        <div className="security-note">
          <span>🔒</span>
          اطلاعات شما با رمزنگاری امن محافظت می‌شود
        </div>
      </div>
    </div>
  );
}