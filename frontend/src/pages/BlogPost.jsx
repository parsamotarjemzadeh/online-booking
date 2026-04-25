import { useEffect, useState } from "react";
import api from "../services/api";
import "./BlogPost.css";

const BlogPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`posts/list/${postId}/`);
        setPost(res.data);
      } catch (error) {
        console.error("Error loading post:", error);
        setError("مقاله مورد نظر یافت نشد.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  // ─── حالت بارگذاری ───
  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="post-loading">
          <div className="skeleton-hero">
            <div className="skeleton-line" style={{ width: "30%", height: "30px", margin: "0 auto 20px" }} />
            <div className="skeleton-line" style={{ width: "80%", height: "40px", margin: "0 auto 15px" }} />
            <div className="skeleton-line" style={{ width: "60%", height: "20px", margin: "0 auto" }} />
          </div>
          <div className="skeleton-body">
            {[100, 90, 95, 80, 100, 70].map((w, i) => (
              <div key={i} className="skeleton-line" style={{ height: "18px", width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── حالت خطا ───
  if (error) {
    return (
      <div className="blog-post-page">
        <div className="post-error">
          <div className="post-error-icon">❌</div>
          <h2>خطا در بارگذاری مقاله</h2>
          <p>{error}</p>
          <button
            className="btn-back"
            style={{ margin: "30px auto 0" }}
            onClick={() => window.history.back()}
          >
            ← بازگشت به وبلاگ
          </button>
        </div>
      </div>
    );
  }

  // ─── نمایش مقاله ───
  return (
    <div className="blog-post-page">
      <div className="post-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#" onClick={(e) => e.preventDefault()}>🏠</a>
          <span className="breadcrumb-sep">/</span>
          <a href="#" onClick={(e) => e.preventDefault()}>وبلاگ</a>
          <span className="breadcrumb-sep">/</span>
          <span>مقاله</span>
        </div>

        {/* کارت مقاله */}
        <div className="post-card">
          {/* هدر */}
          <div className="post-hero">
            <span className="post-category-badge">
              📌 {post.category || "مشاوره عمومی"}
            </span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <div className="post-meta-item">
                <span className="icon">👤</span>
                <span>{post.author_name || "مرکز مشاوره"}</span>
              </div>
              <div className="post-meta-item">
                <span className="icon">📅</span>
                <span>
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
              <div className="post-meta-item">
                <span className="icon">⏱️</span>
                <span>{post.read_time || "۵"} دقیقه مطالعه</span>
              </div>
            </div>
          </div>

          {/* محتوا */}
          <div className="post-content">
            {/* اگر محتوا HTML است */}
            {post.content_html ? (
              <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
            ) : (
              /* اگر محتوا متن ساده است */
              post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
          </div>

          {/* فوتر */}
          <div className="post-footer">
            <div className="post-tags">
              {post.tags?.map((tag, index) => (
                <span key={index} className="post-tag">
                  #{tag}
                </span>
              )) || (
                <>
                  <span className="post-tag">#مشاوره</span>
                  <span className="post-tag">#سلامت_روان</span>
                </>
              )}
            </div>
            <div className="post-actions">
              <button className="btn-action">
                <span>🔗</span> اشتراک‌گذاری
              </button>
              <button className="btn-action">
                <span>❤️</span> پسندیدن
              </button>
            </div>
          </div>
        </div>

        {/* دکمه بازگشت */}
        <div className="back-button">
          <button
            className="btn-back"
            onClick={() => window.history.back()}
          >
            ← بازگشت به وبلاگ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;