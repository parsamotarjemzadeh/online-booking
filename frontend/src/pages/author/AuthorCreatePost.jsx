import { useState } from "react";
import api from "../../services/api";

export default function AuthorCreatePost(){

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [isPublished,setIsPublished] = useState(false);

  const createPost = async () => {

    await api.post("/posts/",{
      title,
      content,
      is_published: isPublished ? "true" : "false"
    });

    alert("پست ساخته شد!");

    setTitle("");
    setContent("");
    setIsPublished(false);
  }

  return(
    <div>

      <h2>پست جدید</h2>

      <input
        placeholder="عنوان"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{display:"block", marginBottom:"10px", width:"300px"}}
      />

      <textarea
        placeholder="محتوا"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        style={{display:"block", marginBottom:"10px", width:"400px"}}
        rows={6}
      />

      <label style={{display:"flex", alignItems:"center", gap:"10px"}}>
        <input 
          type="checkbox"
          checked={isPublished}
          onChange={(e)=>setIsPublished(e.target.checked)}
        />
        منتشر شود؟
      </label>

      <br/>

      <button onClick={createPost}>ساخت پست</button>

    </div>
  )
}
