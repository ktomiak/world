import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔹 Dodaj ten useEffect:
  useEffect(() => {
    if (token) {
      try {
        const user = jwtDecode(token);
        console.log("Zdekodowany token:", user); // 👀 do diagnostyki
        setIsAdmin(user.role === "admin");
      } catch (err) {
        console.error("Błąd dekodowania tokena:", err);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  const handleLogin = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const handleLogout = () => {
    setToken("");
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <div style={{ padding: 20 }}>
      <Navbar token={token} isAdmin={isAdmin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/profile"
          element={token ? <Profile token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={token ? <AddPost token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPanel token={token} /> : <Navigate to="/posts" />}
        />

      </Routes>
    </div>
  );
}

export default App;
