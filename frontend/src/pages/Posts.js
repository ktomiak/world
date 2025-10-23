import { useEffect, useState } from "react";
import { getPosts } from "../api";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h2>Lista postów</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <h4>{p.title}</h4>
            <p>{p.content}</p>
            <small>{p.author}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
