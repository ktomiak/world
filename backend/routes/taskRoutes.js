import express from "express";
import { getTasks, getMyTasks, createTask, updateTask } from "../controllers/taskController.js";//deleteTask
import authMiddleware from "../middleware/authMiddleware.js";
import { requireRoles } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get("/", authMiddleware, requireRoles(ROLES.ADMIN), getTasks);
router.get("/my", authMiddleware, requireRoles(ROLES.ADMIN), getMyTasks);
router.post("/", authMiddleware, requireRoles(ROLES.ADMIN), createTask);
router.put("/:id", authMiddleware, requireRoles(ROLES.ADMIN), updateTask);
//router.delete("/:id", authMiddleware, requireRoles(ROLES.ADMIN), deleteTask);

export default router;
