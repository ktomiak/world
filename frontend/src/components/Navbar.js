import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar({ token, isAdmin, onLogout }) {
  return (
    <nav id={isAdmin ? "navbar-admin" : "navbar"}>
      <div className="nav-left">
        <Link to="/posts">📖 Posty</Link>
        {token && <Link to="/profile">👤 Profil</Link>}
        {isAdmin && <Link to="/admin/chat">⚙️ Panel Admina</Link>}
      </div>
      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login">🔑 Logowanie</Link>
            <Link to="/register">🧾 Rejestracja</Link>
          </>
        ) : (
          <button onClick={onLogout}>🚪 Wyloguj</button>
        )}
      </div>
    </nav>
  );
}
