import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Pobranie danych zalogowanego użytkownika
router.get("/me", authMiddleware, getMe);

// Aktualizacja username i/lub hasła
router.put("/me", authMiddleware, updateMe);

export default router;