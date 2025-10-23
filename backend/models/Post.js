import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

export default Post;