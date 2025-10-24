import { DataTypes } from "sequelize";

export async function up(queryInterface) {
  await queryInterface.addColumn("Posts", "isEdited", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("Posts", "isEdited");
}