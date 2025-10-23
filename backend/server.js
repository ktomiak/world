import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

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
const init = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Baza danych gotowa");

    // Sprawdzamy, czy istnieje użytkownik
    const userCount = await User.count();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const admin = await User.create({
        username: "Losketh",
        email: "krzysztof.tomiak@wp.pl",
        password: hashedPassword,
        role: "admin"
      });
      console.log("👑 Domyślny admin utworzony:", admin.dataValues);
    } else {
      console.log("Użytkownicy już istnieją, nie tworzę admina.");
    }
    app.listen(PORT, () => console.log(`🚀 Server działa na porcie ${PORT}`));
  } catch (err) {
      console.error("Błąd inicjalizacji:", err);
    }
  };

init();
