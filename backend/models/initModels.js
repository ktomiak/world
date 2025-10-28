import sequelize from "../config/db.js";
import User from "./User.js";
import Task from "./Task.js";
import Post from "./Post.js";

// 🟢 Jeden użytkownik może mieć wiele swoich zadań
User.hasMany(Task, { foreignKey: "ownerId", as: "ownedTasks" });

// 🟢 Jeden użytkownik może mieć wiele postów
User.hasMany(Post, { foreignKey: "userId" });

// 🟢 Task należy do użytkownika (właściciela)
Task.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

// 🟢 Task ma wielu administratorów (Userów z rolą ADMIN)
Task.belongsToMany(User, {
  through: "TaskAdmins",
  as: "admins",
  foreignKey: "taskId",
});

// 🟢 Użytkownik może być przypisany do wielu tasków jako admin
User.belongsToMany(Task, {
  through: "TaskAdmins",
  as: "adminTasks",
  foreignKey: "userId",
});

// 🟢 Post należy do użytkownika
Post.belongsTo(User, { foreignKey: "userId" });

export { sequelize, User, Task, Post };
