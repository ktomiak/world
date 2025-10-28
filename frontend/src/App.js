import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/Admin/AdminUsers";
import AdminTasks from "./pages/Admin/AdminTasks";
import AdminMyTasks from "./pages/Admin/AdminMyTasks";
import AdminChat from "./pages/Admin/AdminChat";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const user = jwtDecode(token);
        //console.log("Zdekodowany token:", user);
        setCurrentUser(user);
        setIsAdmin(user.role === "admin");
      } catch (err) {
        //console.error("Błąd dekodowania tokena:", err);
        setIsAdmin(false);
        setCurrentUser(null);
      }
    } else {
      setIsAdmin(false);
      setCurrentUser(null);
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
        <Route path="/posts" element={<Posts token={token} currentUser={currentUser} />} />
        <Route
          path="/profile"
          element={token ? <Profile token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/users"
          element={isAdmin ? <AdminPanel token={token} /> : <Navigate to="/posts" />}
        />
        <Route
          path="/admin/tasks"
          element={isAdmin ? <AdminTasks token={token} /> : <Navigate to="/posts" />}
        />
        <Route
          path="/admin/my-tasks"
          element={isAdmin ? <AdminMyTasks token={token} /> : <Navigate to="/posts" />}
        />
        <Route
          path="/admin/chat"
          element={isAdmin ? <AdminChat token={token} /> : <Navigate to="/posts" />}
        />

      </Routes>
    </div>
  );
}

export default App;
