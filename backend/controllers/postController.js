import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, userId: req.user.id  });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  const { sort, author, showDeleted, showEdited } = req.query;

  try {
    // 🔹 Filtry
    const filter = {};

    // Domyślnie NIE pokazujemy usuniętych postów
    if (showDeleted !== "true") {
      filter.isDeleted = false;
    }

    // Jeśli użytkownik chce tylko edytowane
    if (showEdited === "true") {
      filter.isEdited = true;
    }

    // Filtrowanie po nazwie użytkownika
    if (author) {
      filter["$User.username$"] = author;
    }

    // 🔹 Sortowanie — tylko dozwolone pola
    const allowedSortFields = ["createdAt", "updatedAt", "author"];
    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";
    const sortOrder = sortField === "author" ? "ASC" : "DESC";

    // 🔹 Pobranie danych
    const posts = await Post.findAll({
      where: filter,
      include: {
        model: User,
        attributes: ["id", "username"],
        required: false
      },
      order:
        sortField === "author"
          ? [[User, "username", sortOrder]]
          : [[sortField, sortOrder]],
    });

    // 🔹 Formatowanie wyniku do frontendu
    const formatted = posts.map((p) => ({
      id: p.id,
      title: p.isDeleted ? "" : p.title,
      content: p.isDeleted ? "" : p.content,
      author: p.User ? p.User.username : "Nieznany użytkownik",
      userId: p.User ? p.User.id : null,
      isDeleted: p.isDeleted,
      isEdited: p.isEdited,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Błąd w getPosts:", err);
    res.status(500).json({ error: "Nie udało się pobrać postów." });
  }
};

export const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    let edited = false;
    if (title !== undefined) {
      req.post.title = title;
      edited = true;
    }

    if (content !== undefined) {
      req.post.content = content;
      edited = true;
    }

    if (edited) {
      req.post.isEdited = true; 
    }

    await req.post.save();

    res.json({ message: "Post zaktualizowany", post: req.post });
  } catch (err) {
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
