import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true // jeśli używasz cookies
}));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
console.log("🚦 routes mounted: /api/auth, /api/posts, /api/users");

const PORT = process.env.PORT || 5000;

// Synchronizacja bazy
sequelize.sync().then(() => {
  console.log("✅ Baza danych gotowa");
  console.log("🔑 JWT_SECRET =", process.env.JWT_SECRET);
  app.listen(PORT, () => console.log(`🚀 Server działa na porcie ${PORT}`));
});
