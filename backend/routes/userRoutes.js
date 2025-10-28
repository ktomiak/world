import express from "express";
import { getMe, updateMe, getAllUsers, getAllAdminUsers, getRoles, updateUserRoles } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireRoles } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";


const router = express.Router();

// Pobranie danych zalogowanego użytkownika
router.get("/me", authMiddleware, getMe);

// Aktualizacja username i/lub hasła
router.put("/me", authMiddleware, updateMe);

router.get("/roles", authMiddleware, requireRoles(ROLES.ADMIN), getRoles);
router.get("/", authMiddleware, requireRoles(ROLES.ADMIN), getAllUsers);
router.get("/admin", authMiddleware, requireRoles(ROLES.ADMIN), getAllAdminUsers);
router.put("/:id", authMiddleware, requireRoles(ROLES.ADMIN), updateUserRoles);


export default router;requireRoles