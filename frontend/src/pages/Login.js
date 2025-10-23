import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);
    if (data.token) {
      onLogin(data.token);
      navigate("/posts");
    } else {
      setMsg(data.message || JSON.stringify(data));
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          onChange={handleChange}
        />
        <button type="submit">Zaloguj</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
