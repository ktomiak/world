import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Połączono z bazą danych");

    
    console.log("🚦 Uruchom serwer i zastosuj migracje ręcznie przez Sequelize CLI");
    console.log('npm run db:migrate');
    console.log('npm run db:seed');

    app.listen(PORT, () => {
      console.log(`Server działa na porcie ${PORT}`);
    });
  } catch (err) {
    console.error("Błąd inicjalizacji:", err);
  }
};

init();
