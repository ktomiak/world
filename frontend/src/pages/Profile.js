import { useState, useEffect } from "react";
import { getMe, updateMe } from "../api";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe(token);
      setUser(data);
      setUsername(data.username);
    };
    fetchUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username };
    if (password) payload.password = password;

    const data = await updateMe(token, payload);
    if (data.username) {
      setUser(data);
      setPassword("");
      setMsg("Dane zapisane!");
    } else {
      setMsg("Nie udało się zaktualizować danych");
    }
  };

  if (!user) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Profil użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input type="text" value={user.email} disabled />
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Nowe hasło: </label>
          <input
            type="password"
            value={password}
            placeholder="Wpisz nowe hasło jeśli chcesz zmienić"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Zapisz</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
