import Post from "../models/Post.js";
import { ROLES } from "../constants/roles.js";

export const canEdit = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Element nie istnieje" });

    if (post.isDeleted) {
      return res.status(400).json({ error: "Nie można edytować usuniętego elementu" });
    }


    req.post = post; // przekazanie posta do dalszego użycia

    const role = req.user.role;
    const isOwner = post.userId === req.user.id;

    if (role === ROLES.admin || role === ROLES.editor || (role === ROLES.user && isOwner)) {
      return next();
    }

    return res.status(403).json({ error: "Brak uprawnień do edycji tego elementu" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};