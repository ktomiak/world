import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware do weryfikacji tokena
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Brak tokena" });
  
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: "Nieprawidłowy token" });
  }
};

export const createPost = [verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, userId: req.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}];

export const getPosts = async (req, res) => {
  const posts = await Post.findAll({
    include: { model: User, attributes: ["username"] }
  });
  res.json(posts);
};
