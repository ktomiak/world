import { Link } from "react-router-dom";

export default function Navbar({ token, onLogout }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div>
        <Link to="/posts">📖 Posty</Link>{" "}
        {token && <Link to="/profile">👤 Profil</Link>}
        {token && <Link to="/add">✏️ Dodaj post</Link>}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login">🔑 Logowanie</Link>{" "}
            <Link to="/register">🧾 Rejestracja</Link>
          </>
        ) : (
          <button onClick={onLogout}>🚪 Wyloguj</button>
        )}
      </div>
    </nav>
  );
}
