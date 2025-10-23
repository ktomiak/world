import express from "express";
import { createPost, getPosts,  deletePost} from "../controllers/postController.js";
import { requireRoles } from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.delete("/", authMiddleware, requireRoles(ROLES.ADMIN), deletePost);

export default router;