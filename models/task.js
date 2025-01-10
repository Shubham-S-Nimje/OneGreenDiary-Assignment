const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
      defaultValue: "TODO",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Task;
