import { DataTypes } from "sequelize";
import sequelize from "../conn.js";
import Driver from "../driver/model.js";

const Car = sequelize.define(
  "car",
  {
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mileage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: Driver,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
  }
);

export default Car;
