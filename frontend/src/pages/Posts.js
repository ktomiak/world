import { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "../api"; // musisz dodać updatePost w api

export default function Posts({ token, currentUser }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); // post do edycji
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const canEditOrDelete = (post) => {
    console.log(post);
    if (!currentUser || post.isDeleted) return false;

    return (
      currentUser.role === "admin" ||
      currentUser.role === "editor" ||
      currentUser.username === post.author
    );
  };


  const handleEditClick = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDeleteClick = async (postId) => {
    if (!token) return;
    await deletePost(token, postId);
    fetchPosts();
  };

  const handleSave = async () => {
    if (!token || !editingPost) return;
    await updatePost(token, editingPost.id, { title, content });
    setEditingPost(null);
    fetchPosts();
  };

  return (
    <div>
      <h2>Lista postów</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id} style={{ marginBottom: 20 }}>
            <h4>{p.title}</h4>
            <p>{p.content}</p>
            <small>{p.author}</small>
            {canEditOrDelete(p) && (
              <>
                <button onClick={() => handleEditClick(p)}>Edytuj</button>
                <button onClick={() => handleDeleteClick(p.id)}>Usuń</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Popup do edycji */}
      {editingPost && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
            <h3>Edytuj post</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tytuł"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Treść"
            />
            <div style={{ marginTop: 10 }}>
              <button onClick={handleSave}>Zapisz</button>
              <button onClick={() => setEditingPost(null)}>Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
