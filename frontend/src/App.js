import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div style={{ padding: 20 }}>
      <Navbar token={token} onLogout={handleLogout} />
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
      </Routes>
    </div>
  );
}

export default App;
