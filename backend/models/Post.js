import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  userId: {            
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isEdited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDeleted: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
});

export default Post;