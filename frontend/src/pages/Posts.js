import { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "../api";
import AddPostModal from "../components/AddPostModal";
import "../styles/post.css";

export default function Posts({ token, currentUser }) {
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Filtry i sortowanie
  const [sortBy, setSortBy] = useState("createdAt");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [showEdited, setShowEdited] = useState(false);

  // 🔹 Funkcja pobierająca posty z backendu
  const fetchPosts = async () => {
    const query = new URLSearchParams({
      sort: sortBy,
      author: filterAuthor,
      showDeleted: showDeleted.toString(),
      showEdited: showEdited.toString(),
    }).toString();

    try {
      const res = await fetch(`http://localhost:5000/api/posts?${query}`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []); // zabezpieczenie
    } catch (err) {
      console.error("Błąd pobierania postów:", err);
    }
  };

  // 🔹 Odświeżaj dane przy zmianie filtrów lub sortowania
  useEffect(() => {
    fetchPosts();
  }, [sortBy, filterAuthor, showDeleted, showEdited]);

  // 🔹 Sprawdzenie uprawnień
  const canEditOrDelete = (post) => {
    if (!currentUser || post.isDeleted) return false;

    return (
      currentUser.role === "admin" ||
      currentUser.role === "editor" ||
      currentUser.username === post.author
    );
  };

  // 🔹 Obsługa edycji
  const handleEditClick = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleSave = async () => {
    if (!token || !editingPost) return;
    await updatePost(token, editingPost.id, { title, content });
    setEditingPost(null);
    fetchPosts();
  };

  // 🔹 Obsługa usuwania
  const handleDeleteClick = async (postId) => {
    if (!token) return;
    await deletePost(token, postId);
    fetchPosts();
  };

  return (
  <div id="posts-page">
    <div id="posts-header">
      <h2>Lista postów</h2>
    </div>

    <AddPostModal token={token} onPostAdded={fetchPosts} />

    <div id="posts-filters">
      <label>
        Sortuj po:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Dacie utworzenia</option>
          <option value="updatedAt">Dacie modyfikacji</option>
          <option value="author">Autorze</option>
        </select>
      </label>
      <label>
        Autor:
        <input
          type="text"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          placeholder="Username"
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={showDeleted}
          onChange={(e) => setShowDeleted(e.target.checked)}
        />
        Pokaż usunięte
      </label>
      <label>
        <input
          type="checkbox"
          checked={showEdited}
          onChange={(e) => setShowEdited(e.target.checked)}
        />
        Tylko edytowane
      </label>
    </div>

    <ul id="posts-list">
      {posts.map((p) => (
        <li key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.content}</p>
          <small>
            Autor: {p.author} • {new Date(p.updatedAt).toLocaleString()}
            {p.isEdited && <em className="edited">(edytowany)</em>}
            {p.isDeleted && <em className="deleted">(usunięty)</em>}
          </small>
          {canEditOrDelete(p) && !p.isDeleted && (
            <div className="post-actions">
              <button className="edit" onClick={() => handleEditClick(p)}>✏️ Edytuj</button>
              <button className="delete" onClick={() => handleDeleteClick(p.id)}>🗑 Usuń</button>
            </div>
          )}
        </li>
      ))}
    </ul>

    {editingPost && (
      <div id="edit-popup">
        <div className="popup-content">
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
          <div className="popup-buttons">
            <button className="save" onClick={handleSave}>💾 Zapisz</button>
            <button className="cancel" onClick={() => setEditingPost(null)}>❌ Anuluj</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
