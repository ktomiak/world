import Post from "../models/Post.js";
import { ROLES } from "../constants/roles.js";

export const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Nie zalogowany" });

    if (req.user.role === ROLES.blocked) {
      return res.status(403).json({ message: "Twoje konto jest zablokowane" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Brak uprawnień" });
    }

    next();
  };
};