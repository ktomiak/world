import { DataTypes } from "sequelize";

export async function up(queryInterface) {
  await queryInterface.addColumn("Posts", "isDeleted", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("Posts", "isDeleted");
}