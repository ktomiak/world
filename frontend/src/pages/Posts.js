import { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "../api";

export default function Posts({ token, currentUser }) {
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
    <div>
      <h2>Lista postów</h2>

      {/* 🔹 Filtry i sortowanie */}
      <div style={{ marginBottom: 20 }}>
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
            placeholder="np. Losketh"
            style={{ marginLeft: 8 }}
          />
        </label>

        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
          Pokaż usunięte
        </label>

        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            checked={showEdited}
            onChange={(e) => setShowEdited(e.target.checked)}
          />
          Tylko edytowane
        </label>
      </div>

      {/* 🔹 Lista postów */}
      <ul>
        {posts.map((p) => (
          <li
            key={p.id}
            style={{
              marginBottom: 20,
              borderBottom: "1px solid #ccc",
              paddingBottom: 10,
            }}
          >
            <h4>{p.title}</h4>
            <p>{p.content}</p>
            <small>
              Autor: {p.author} • {new Date(p.updatedAt).toLocaleString()}
              {p.isEdited && <em style={{ color: "orange" }}> (edytowany)</em>}
              {p.isDeleted && <em style={{ color: "red" }}> (usunięty)</em>}
            </small>
            <br />
            {canEditOrDelete(p) && !p.isDeleted && (
              <>
                <button onClick={() => handleEditClick(p)}>✏️ Edytuj</button>
                <button onClick={() => handleDeleteClick(p.id)}>🗑 Usuń</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* 🔹 Popup edycji */}
      {editingPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: 20, borderRadius: 8, width: 400 }}>
            <h3>Edytuj post</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tytuł"
              style={{ width: "100%", marginBottom: 10 }}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Treść"
              style={{ width: "100%", height: 100 }}
            />
            <div style={{ marginTop: 10, textAlign: "right" }}>
              <button onClick={handleSave}>💾 Zapisz</button>
              <button onClick={() => setEditingPost(null)} style={{ marginLeft: 10 }}>
                ❌ Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
