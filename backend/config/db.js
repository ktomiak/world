import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // plik z bazą danych
  logging: false
});

export default sequelize;
