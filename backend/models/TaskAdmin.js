import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Task from "./Task.js";

const TaskAdmin = sequelize.define("TaskAdmin", {
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: "id",
    },
      onDelete: "CASCADE",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
      onDelete: "CASCADE",
  },
}, { timestamps: false });

export default TaskAdmin;
