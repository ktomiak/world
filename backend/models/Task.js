import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import { TASK_STATUS } from "../constants/taskStatus.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(TASK_STATUS)),
    defaultValue: TASK_STATUS.TODO,
  },
  startDate: {
    type: DataTypes.DATE,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  dependsOnId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isGlobal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Task;
