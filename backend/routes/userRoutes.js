import express from "express";
import { getMe, updateMe, getAllUsers, updateUserRoles } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireRoles } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";


const router = express.Router();

// Pobranie danych zalogowanego użytkownika
router.get("/me", authMiddleware, getMe);

// Aktualizacja username i/lub hasła
router.put("/me", authMiddleware, updateMe);


router.get("/users", authMiddleware, requireRoles(ROLES.ADMIN), getAllUsers);
router.put("/user:id", authMiddleware, requireRoles(ROLES.ADMIN), updateUserRoles);

export default router;requireRoles