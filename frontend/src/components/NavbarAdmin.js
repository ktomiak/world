import { NavLink } from "react-router-dom";
import "../styles/admin.css";

export default function NavbarAdmin() {
  return (
    <nav className="admin-navbar">
      <NavLink to="/admin/users">Użytkownicy</NavLink>
      <NavLink to="/admin/tasks">Zadania Adminow</NavLink>
      <NavLink to="/admin/my-tasks">Prywatne Taski</NavLink>
      <NavLink to="/admin/chat">💬 Chat adminów</NavLink>
    </nav>
  );
}
