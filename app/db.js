import Car from "./car/model.js";
import sequelize from "./conn.js";
import Driver from "./driver/model.js";
import License from "./license/model.js";

Driver.hasOne(License, {
  // Delete child 🧒🏾 records when parent is deleted
  onDelete: "CASCADE",
});
License.belongsTo(Driver);

Driver.hasMany(Car);

/**
 * "The defaults for the One-To-One associations is SET NULL for ON DELETE"
 * https://sequelize.org/docs/v6/core-concepts/assocs/#options
 */
Car.belongsTo(Driver);

// https://sequelize.org/docs/v6/core-concepts/model-basics/#synchronizing-all-models-at-once
await sequelize.sync().catch((err) => {
  console.error(`Error syncing database: ${err}`);
  process.exit(1);
});

console.info("All models were synchronized successfully.");
