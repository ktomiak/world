import { useState } from "react";
import { createPost } from "../api";
import "../styles/addPostModal.css";

export default function AddPostModal({ token, onPostAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createPost(token, form);
      if (data && data.id) {
        onPostAdded?.(); // odśwież listę postów
        setIsOpen(false);
        setForm({ title: "", content: "" });
      } else {
        alert("Nie udało się dodać posta");
      }
    } catch (err) {
      console.error("Błąd przy dodawaniu posta:", err);
      alert("Nie udało się dodać posta");
    }
  };

  return (
    <div id="add-post-modal-wrapper">
     
      <button id="open-add-post-btn" onClick={() => setIsOpen(true)}>
        ➕ Dodaj post
      </button>

      {isOpen && (
        <div id="add-post-backdrop" onClick={() => setIsOpen(false)}>
          <div
            id="add-post-modal"
            onClick={(e) => e.stopPropagation()} // zapobiega zamknięciu przy kliknięciu w środek
          >
            <h3>✏️ Nowy post</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Tytuł posta"
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="content"
                placeholder="Treść posta..."
                value={form.content}
                onChange={handleChange}
                rows="5"
                required
              />
              <div id="modal-buttons">
                <button type="submit">💾 Zapisz</button>
                <button
                  type="button"
                  id="cancel-btn"
                  onClick={() => setIsOpen(false)}
                >
                  ❌ Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
