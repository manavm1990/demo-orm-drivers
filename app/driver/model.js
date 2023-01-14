import { DataTypes } from "sequelize";
import sequelize from "../conn.js";

const Driver = sequelize.define(
  "driver",
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
  { sequelize, timestamps: false, underscored: true }
);

export default Driver;
