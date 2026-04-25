import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminPosts({ setPage, setEditingPostId }) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("admin/posts/")   // همه پست ها نه فقط mine
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>تمام پست‌ها</h2>

      {posts.map(post => (
        <div 
          key={post.id}
          style={{
            border:"1px solid #ddd",
            padding:"10px",
            marginBottom:"10px",
            borderRadius:"8px"
          }}
        >
          <h3>{post.title}</h3>
          <p>نویسنده: {post.author_name}</p>
          <p>{post.is_published? "منتشر شده" : "پیش‌نویس"}</p>

          <button
            onClick={() => {
              setEditingPostId(post.id);
              setPage("managePost");
            }}
          >
            ویرایش
          </button>
        </div>
      ))}
    </div>
  );
}
