import express from "express";
import { createPost, getPosts, editPost, deletePost} from "../controllers/postController.js";
import { requireRoles } from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { canEdit } from "../middleware/canEditMiddleware.js";
import { ROLES } from "../constants/roles.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, canEdit, deletePost);
router.put("/:id", authMiddleware, canEdit, editPost);

export default router;