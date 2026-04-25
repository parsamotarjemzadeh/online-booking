import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AuthorManagePost({ postId, setPage }) {

  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${postId}/`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [postId]);

  const save = async () => {
    await api.patch(`/posts/${postId}/`, post);
    alert("تغییرات ذخیره شد!");
  };

  const remove = async () => {
    if(!window.confirm("آیا مطمئنی می‌خواهی حذف کنی؟")) return;
    await api.delete(`/posts/${postId}/`);
    alert("پست حذف شد!");
    setPage("posts");  // برگشت به صفحه لیست
  };

  if(!post) return <p>در حال بارگذاری...</p>;

  return (
    <div>

      <h2>مدیریت پست</h2>

      <input
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
        style={{ display:"block", marginBottom:"10px", width:"300px" }}
      />

      <textarea
        value={post.content}
        onChange={e => setPost({ ...post, content: e.target.value })}
        rows={6}
        style={{ display:"block", marginBottom:"10px", width:"400px" }}
      />

      <label style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <input
          type="checkbox"
          checked={post.is_published === "true"}
          onChange={(e) =>
            setPost({
              ...post,
              is_published: e.target.checked ? "true" : "false"
            })
          }
        />
        منتشر شده؟
      </label>

      <br/>

      <button onClick={save}>ذخیره تغییرات</button>
      <button 
        onClick={remove} 
        style={{ marginLeft:"10px", color:"red" }}
      >
        حذف پست
      </button>

      <button 
        onClick={() => setPage("posts")} 
        style={{ marginLeft:"10px" }}
      >
        بازگشت
      </button>

    </div>
  );
}
