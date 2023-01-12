import { DataTypes } from "sequelize";
import sequelize from "../conn.js";

const Driver = sequelize.define(
  "Driver",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Driver", timestamps: false, underscored: true }
);

export default Driver;
