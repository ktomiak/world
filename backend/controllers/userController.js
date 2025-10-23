import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Pobranie zalogowanego użytkownika
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["email", "username"] // nie pokazujemy hasła
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Nie udało się pobrać danych użytkownika" });
  }
};

// Aktualizacja username i/lub hasła
export const updateMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "Użytkownik nie znaleziony" });

    const { username, password } = req.body;
    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10); // hashujemy nowe hasło

    await user.save();
    res.json({ email: user.email, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Nie udało się zaktualizować użytkownika" });
  }
};
