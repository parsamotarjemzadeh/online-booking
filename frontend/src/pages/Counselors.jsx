import { useEffect, useState } from "react";
import api from "../services/api";
import "./Counselors.css";

export default function Counselors({ setPage }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  useEffect(() => {
    api.get("counselors/")
      .then((res) => setList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ─── دریافت تخصص‌های یکتا ───
  const allSpecialties = [
    ...new Set(
      list.flatMap((c) =>
        c.specialties
          ? c.specialties.split(",").map((s) => s.trim())
          : []
      )
    ),
  ].filter(Boolean);

  // ─── فیلتر کردن لیست ───
  const filteredList = list.filter((c) => {
    const name = c.user?.first_name || c.user?.username || "";
    const matchesSearch = name.includes(search);
    const matchesSpecialty =
      specialtyFilter === "all" ||
      c.specialties?.includes(specialtyFilter);
    return matchesSearch && matchesSpecialty;
  });

  // ─── ستاره‌های امتیاز ───
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < fullStars ? "#ffc107" : "#e0e0e0" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  // ─── آواتار رندوم ───
  const getAvatar = (id) => {
    const avatars = ["👨‍⚕️", "👩‍⚕️", "🧑‍⚕️", "👨‍🏫", "👩‍🏫"];
    return avatars[id % avatars.length];
  };

  // ─── رنگ بنر رندوم ───
  const getBannerGradient = (id) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    ];
    return gradients[id % gradients.length];
  };

  // ─── حالت بارگذاری ───
  if (loading) {
    return (
      <div className="counselors-page">
        <div className="counselors-header">
          <div className="header-content">
            <h1>تیم مشاوران ما</h1>
            <p>با بهترین متخصصان سلامت روان آشنا شوید</p>
          </div>
        </div>
        <div className="counselors-container">
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-banner"></div>
                <div className="skeleton-body">
                  <div className="skeleton-line" style={{ width: "60%", height: "24px" }} />
                  <div className="skeleton-line" style={{ width: "40%", height: "16px" }} />
                  <div className="skeleton-line" style={{ width: "80%", height: "16px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── حالت خالی ───
  if (list.length === 0) {
    return (
      <div className="counselors-page">
        <div className="counselors-header">
          <div className="header-content">
            <h1>تیم مشاوران ما</h1>
            <p>با بهترین متخصصان سلامت روان آشنا شوید</p>
          </div>
        </div>
        <div className="counselors-empty">
          <div className="empty-icon">👨‍⚕️</div>
          <h2 className="empty-title">مشاوری یافت نشد</h2>
          <p className="empty-text">
            در حال حاضر مشاوری در سیستم ثبت نشده است.
          </p>
        </div>
      </div>
    );
  }

  // ─── نمایش لیست مشاوران ───
  return (
    <div className="counselors-page">
      {/* هدر */}
      <div className="counselors-header">
        <div className="header-content">
          <h1>تیم مشاوران ما</h1>
          <p>
            با بهترین و باتجربه‌ترین متخصصان سلامت روان آشنا شوید.
            <br />
            هر کدام از مشاوران ما تجربه و تخصص منحصربه‌فردی دارند.
          </p>
        </div>
      </div>

      <div className="counselors-container">
        {/* فیلترها */}
        <div className="counselors-filters">
          <div className="filter-group">
            <select
              className="filter-select"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="all">همه تخصص‌ها</option>
              {allSpecialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="جستجوی نام مشاور..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* گرید مشاوران */}
        {filteredList.length > 0 ? (
          <div className="counselors-grid">
            {filteredList.map((c) => (
              <div key={c.id} className="counselor-card">
                {/* بنر */}
                <div
                  className="counselor-banner"
                  style={{ background: getBannerGradient(c.id) }}
                >
                  {/* آواتار */}
                  <div className="counselor-avatar">
                    {c.user?.avatar ? (
                      <img src={c.user.avatar} alt={c.user.username} />
                    ) : (
                      getAvatar(c.id)
                    )}
                  </div>
                </div>

                {/* محتوا */}
                <div className="counselor-content">
                  <h3 className="counselor-name">
                    {c.user?.first_name || c.user?.username || "مشاور"}
                  </h3>
                  <p className="counselor-specialty">
                    {c.specialty || "مشاور عمومی"}
                  </p>

                  {/* تگ‌های تخصص */}
                  {c.specialties && (
                    <div className="counselor-tags">
                      {c.specialties
                        .split(",")
                        .slice(0, 3)
                        .map((spec, index) => (
                          <span key={index} className="specialty-tag">
                            {spec.trim()}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* آمار */}
                  <div className="counselor-stats">
                    <div className="stat-item">
                      <span className="stat-value">
                        {renderStars(c.rating)}
                      </span>
                      <span className="stat-label">
                        {c.rating?.toFixed(1) || "۰.۰"}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">👥</span>
                      <span className="stat-label">
                        {c.sessions || "۰"} جلسه
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">💬</span>
                      <span className="stat-label">
                        {c.experience || "۰"} سال تجربه
                      </span>
                    </div>
                  </div>

                  {/* دکمه‌ها */}
                  <div className="counselor-actions">
                    <button
                      className="btn-profile"
                      onClick={() => setPage && setPage(`counselor-${c.id}`)}
                    >
                      👁️ مشاهده پروفایل
                    </button>
                    <button
                      className="btn-book"
                      onClick={() => setPage && setPage(`booking-${c.id}`)}
                    >
                      📅 رزرو نوبت
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="counselors-empty">
            <div className="empty-icon">🔍</div>
            <h2 className="empty-title">نتیجه‌ای یافت نشد</h2>
            <p className="empty-text">
              مشاوری با این مشخصات یافت نشد. لطفاً جستجو را تغییر دهید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}