import { useState } from "react";
import "./AuthorLayout.css";

import AuthorDashboard from "./AuthorDashboard";
import AuthorPosts from "./AuthorPosts";
import AuthorCreatePost from "./AuthorCreatePost";
import AuthorManagePost from "./AuthorManagePost";

export default function AuthorLayout() {
  const [page, setPage] = useState("dashboard");
  const [editingPostId, setEditingPostId] = useState(null);

  const navItems = [
    { key: "dashboard", label: "داشبورد", icon: "📊" },
    { key: "posts", label: "پست‌های من", icon: "📝" },
    { key: "create", label: "نوشتن پست جدید", icon: "✏️" },
  ];

  return (
    <div className="author-layout">
      {/* ─── سایدبار ─── */}
      <div className="author-sidebar">
        <div className="sidebar-header">
          <h2>پنل نویسنده</h2>
          <span>مرکز مشاوره</span>
        </div>

        <div className="sidebar-nav">
          {navItems.map((item) => (
            <p
              key={item.key}
              className={page === item.key ? "active" : ""}
              onClick={() => setPage(item.key)}
            >
              <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
              <span>{item.label}</span>
            </p>
          ))}
        </div>

        <div className="sidebar-footer">
          نسخه 1.0.0
        </div>
      </div>

      {/* ─── محتوا ─── */}
      <div className="author-content">
        {page === "dashboard" && (
          <div className="page-enter"><AuthorDashboard /></div>
        )}
        {page === "posts" && (
          <div className="page-enter">
            <AuthorPosts
              setPage={setPage}
              setEditingPostId={setEditingPostId}
            />
          </div>
        )}
        {page === "create" && (
          <div className="page-enter"><AuthorCreatePost /></div>
        )}
        {page === "managePost" && (
          <div className="page-enter">
            <AuthorManagePost
              postId={editingPostId}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}