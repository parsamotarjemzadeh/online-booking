import { useEffect, useState } from "react";
import api from "../services/api";
import "./BlogList.css";

export const BlogList = ({ setPage }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("posts/list/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ─── حالت بارگذاری ───
  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-header">
          <h1>وبلاگ مرکز مشاوره</h1>
          <p>مقالات و مطالب آموزشی ما را دنبال کنید</p>
        </div>
        <div className="blog-loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line" style={{ height: "20px", width: "30%", marginBottom: "15px" }} />
              <div className="skeleton-line" style={{ height: "30px", width: "80%", marginBottom: "12px" }} />
              <div className="skeleton-line" style={{ height: "16px", width: "100%", marginBottom: "8px" }} />
              <div className="skeleton-line" style={{ height: "16px", width: "90%" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── حالت خالی ───
  if (posts.length === 0) {
    return (
      <div className="blog-page">
        <div className="blog-header">
          <h1>وبلاگ مرکز مشاوره</h1>
          <p>مقالات و مطالب آموزشی ما را دنبال کنید</p>
        </div>
        <div className="blog-empty">
          <div className="blog-empty-icon">📝</div>
          <h3>هنوز مطلبی منتشر نشده</h3>
          <p>به زودی مقالات جدید در این بخش قرار خواهد گرفت.</p>
        </div>
      </div>
    );
  }

  // ─── نمایش لیست ───
  return (
    <div className="blog-page">
      {/* هدر صفحه */}
      <div className="blog-header">
        <h1>وبلاگ مرکز مشاوره</h1>
        <p>مقالات و مطالب آموزشی ما را دنبال کنید</p>
      </div>

      {/* لیست پست‌ها */}
      <div className="blog-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => setPage(`blogpost-${post.id}`)}
          >
            <div className="blog-card-header">
              <span className="blog-card-category">
                <span>📌</span>
                {post.category || "مشاوره عمومی"}
              </span>
              <span className="blog-card-date">
                <span>📅</span>
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString("fa-IR")
                  : ""}
              </span>
            </div>

            <h2>{post.title}</h2>

            <p className="blog-card-excerpt">
              {post.content.length > 180
                ? post.content.slice(0, 180) + "..."
                : post.content}
            </p>

            <div className="blog-card-footer">
              <button
                className="btn-read-more"
                onClick={(e) => {
                  e.stopPropagation();
                  setPage(`blogpost-${post.id}`);
                }}
              >
                مشاهده کامل مقاله
                <span className="arrow">←</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};