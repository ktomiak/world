import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddPost({ token }) {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createPost(token, form);
	      // jeśli request zwrócił cokolwiek, idziemy na listę postów
	    if (data && data.id) {
			  navigate("/posts"); // post zapisany, przechodzimy do listy
		} else {
			  alert("Nie udało się dodać posta");
		}
    } catch (err) {
      console.error("Błąd przy dodawaniu posta:", err);
      alert("Nie udało się dodać posta");
    }
  };

  return (
    <div>
      <h2>Dodaj post</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Tytuł"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Treść posta"
          value={form.content}
          onChange={handleChange}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
}
