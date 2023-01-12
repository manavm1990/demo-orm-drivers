import { DataTypes } from "sequelize";
import sequelize from "../conn.js";
import Driver from "../driver/model.js";

const License = sequelize.define(
  "License",
  {
    licenseNumber: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    isDonor: { type: DataTypes.BOOLEAN, defaultValue: true },
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: Driver,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "License", timestamps: false, underscored: true }
);

export default License;
