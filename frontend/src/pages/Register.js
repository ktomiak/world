import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(form);
    setMsg(data.message || JSON.stringify(data));
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Login" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          onChange={handleChange}
        />
        <button type="submit">Zarejestruj</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
