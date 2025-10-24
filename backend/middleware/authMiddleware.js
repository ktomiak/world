import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Brak nagłówka Authorization");
    return res.status(401).json({ error: "Brak tokena" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Token decoded:", decoded);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log("❌ Nie znaleziono użytkownika w DB");
      return res.status(404).json({ error: "Nie znaleziono użytkownika" });
    }
    console.log("Decoded token:", decoded);
    console.log("User from DB:", user);

    req.user = { id: user.id, role: user.role };
    console.log("✅ Middleware OK — req.user:", req.user);
    next();
  } catch (err) {
    console.error("❌ Błąd tokena:", err.message);
    res.status(401).json({ error: "Niepoprawny token" });
  }
}
