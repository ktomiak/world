import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    console.log("Tworzenie posta - req.user:", req.user);
    const { title, content } = req.body;
    const post = await Post.create({ title, content, userId: req.user.id  });
    console.log("Post utworzony:", post.toJSON());
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: { model: User, attributes: ["username"], required: false },
      order: [["createdAt", "DESC"]],
    });

    const formatted = posts.map((p) => ({
      id: p.id,
      title: p.isDeleted ? "Post usunięty" : p.title,
      content: p.isDeleted ? "" : p.content,
      author: p.User ? p.User.username : "Nieznany użytkownik",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Błąd getPosts:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    req.post.isDeleted = true;
    await req.post.save();
    res.json({ message: "Post oznaczony jako usunięty" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
