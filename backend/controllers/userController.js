import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";

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

  export const getAllUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Brak autoryzacji" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Brak uprawnień" });
    }

    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt"],
    });

    res.json(users); // <-- tablica!
  } catch (err) {
    console.error("Błąd getAllUsers:", err);
    res.status(500).json({ error: "Nie udało się pobrać listy użytkowników" });
  }
};

export const updateUserRoles = async (req, res) => {

  const { id } = req.params;
  const { role} = req.body;

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: "Użytkownik nie znaleziony" });

  if (role) user.role = role;

  await user.save();
  res.json({ message: "Uprawnienia zaktualizowane", user });
};

export const getRoles = async (req, res) => {
  try {
    res.json(Object.values(ROLES));
  } catch (err) {
    console.error("Błąd pobierania ról:", err);
    res.status(500).json({ error: "Nie udało się pobrać listy ról" });
  }
};