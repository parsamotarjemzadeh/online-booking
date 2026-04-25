import { useEffect, useState } from "react";
import api from "../services/api";
import "./Appointments.css";

export default function Appointments({ setPage }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    client: user?.id,
    counselor: "",
    start_time: "",
    description: "",
  });

  useEffect(() => {
    api.get("counselors/")
      .then((res) => setCounselors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  // ─── مشاور انتخاب شده ───
  const selectedCounselor = counselors.find(
    (c) => c.id === parseInt(form.counselor)
  );

  // ─── فرمت تاریخ ───
  const formatDate = (dateString) => {
    if (!dateString) return "هنوز انتخاب نشده";
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
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

  // ─── اعتبارسنجی ───
  const validateForm = () => {
    if (!form.counselor) {
      setError("لطفاً یک مشاور را انتخاب کنید.");
      return false;
    }
    if (!form.start_time) {
      setError("لطفاً تاریخ و ساعت نوبت را انتخاب کنید.");
      return false;
    }
    const selectedDate = new Date(form.start_time);
    if (selectedDate <= new Date()) {
      setError("تاریخ انتخابی باید در آینده باشد.");
      return false;
    }
    return true;
  };

  // ─── ارسال فرم ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await api.post("appointments/", form);
      setSuccess(true);

      // بازگشت بعد از ۳ ثانیه
      setTimeout(() => {
        setPage && setPage("appointments");
      }, 3000);
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.detail) {
        setError(errData.detail);
      } else if (errData?.error) {
        setError(errData.error);
      } else {
        setError("خطا در ثبت نوبت. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── حالت موفقیت ───
  if (success) {
    return (
      <div className="booking-page">
        <div className="booking-card">
          <div className="success-notification">
            <div className="success-icon">✅</div>
            <h3>نوبت شما با موفقیت ثبت شد!</h3>
            <p>
              اطلاعات نوبت به ایمیل شما ارسال خواهد شد.
              <br />
              لطفاً ۱۵ دقیقه قبل از زمان نوبت در مرکز حضور داشته باشید.
            </p>
            <button
              className="btn-submit"
              onClick={() => setPage && setPage("my-appointments")}
              style={{ maxWidth: 250, margin: "0 auto" }}
            >
              مشاهده نوبت‌های من
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        {/* ─── هدر ─── */}
        <div className="booking-header">
          <div className="booking-header-content">
            <h1>📅 رزرو نوبت مشاوره</h1>
            <p>
              زمان مناسب را انتخاب کنید تا با مشاور مورد نظرتان
              <br />
              در جلسه مشاوره حضوری یا آنلاین ملاقات کنید.
            </p>
          </div>
        </div>

        {/* ─── فرم ─── */}
        <form className="booking-form" onSubmit={handleSubmit}>
          {/* پیام خطا */}
          {error && (
            <div className="error-notification">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* انتخاب مشاور */}
          <div className="form-group">
            <label className="form-label">
              <span className="required">*</span>
              انتخاب مشاور
            </label>
            <div className="select-wrapper">
              <select
                name="counselor"
                className="form-select"
                value={form.counselor}
                onChange={handleChange}
              >
                <option value="">انتخاب مشاور...</option>
                {counselors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.user?.first_name || c.user?.username} -{" "}
                    {c.specialty || c.specialties}
                  </option>
                ))}
              </select>
            </div>

            {/* نمایش مشاور انتخاب شده */}
            {selectedCounselor && (
              <div className="selected-counselor">
                <div className="selected-counselor-avatar">👨‍⚕️</div>
                <div className="selected-counselor-info">
                  <h4>
                    {selectedCounselor.user?.first_name ||
                      selectedCounselor.user?.username}
                  </h4>
                  <p>{selectedCounselor.specialty || selectedCounselor.specialties}</p>
                </div>
              </div>
            )}
          </div>

          {/* تاریخ و ساعت */}
          <div className="form-group">
            <label className="form-label">
              <span className="required">*</span>
              تاریخ و ساعت نوبت
              <span className="hint"> - مدت هر جلسه: ۵۰ دقیقه</span>
            </label>
            <div className="datetime-wrapper">
              <input
                type="datetime-local"
                name="start_time"
                className="datetime-input"
                value={form.start_time}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
              />
              <input
                type="text"
                className="datetime-input"
                placeholder="مدت جلسه: ۵۰ دقیقه"
                disabled
                style={{ background: "#f0f0f0", cursor: "not-allowed" }}
              />
            </div>
          </div>

          {/* توضیحات */}
          <div className="form-group">
            <label className="form-label">
              توضیحات
              <span className="hint"> - اختیاری</span>
            </label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="اگر موضوع خاصی دارید یا توضیحاتی نیاز است، اینجا بنویسید..."
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* خلاصه نوبت */}
          {form.counselor && form.start_time && (
            <div className="appointment-summary">
              <h3 className="summary-title">📋 خلاصه نوبت</h3>
              <div className="summary-items">
                <div className="summary-item">
                  <span className="icon">👨‍⚕️</span>
                  <div>
                    <span className="label">مشاور</span>
                    <span className="value">
                      {selectedCounselor?.user?.first_name ||
                        selectedCounselor?.user?.username || "-"}
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <span className="icon">📅</span>
                  <div>
                    <span className="label">تاریخ</span>
                    <span className="value">{formatDate(form.start_time)}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <span className="icon">🕐</span>
                  <div>
                    <span className="label">ساعت</span>
                    <span className="value">{formatTime(form.start_time)}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <span className="icon">⏱️</span>
                  <div>
                    <span className="label">مدت</span>
                    <span className="value">۵۰ دقیقه</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* دکمه ثبت */}
          <button
            type="submit"
            className={`btn-submit ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {!loading && (
              <>
                <span>✓</span>
                ثبت نوبت مشاوره
              </>
            )}
          </button>
        </form>

        {/* ─── نکات کمکی ─── */}
        <div className="help-tips">
          <h4>💡 نکات مهم</h4>
          <ul>
            <li>جلسات مشاوره به صورت حضوری یا آنلاین برگزار می‌شود.</li>
            <li>لطفاً ۱۵ دقیقه قبل از زمان نوبت در مرکز حضور داشته باشید.</li>
            <li>امکان لغو یا تغییر نوبت تا ۲۴ ساعت قبل وجود دارد.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}