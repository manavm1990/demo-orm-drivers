import Car from "../car/model.js";
import sequelize from "../conn.js";
import Driver from "../driver/model.js";
import License from "../license/model.js";
import carSeed from "./seeds/car.json" assert { type: "json" };
import driverSeed from "./seeds/driver.json" assert { type: "json" };

async function seed() {
  await Driver.bulkCreate(driverSeed);

  // Create 🪪 license for each driver
  const drivers = await Driver.findAll();
  Promise.all(
    drivers.map(async (driver) => {
      await License.create({ driverId: driver.id });
    })
  );

  // Iterate over each car and create 🪪 car with a random 🪪 driver id
  Promise.all(
    carSeed.map(async (car) => {
      await Car.create({
        ...car,
        driverId: drivers[Math.floor(Math.random() * drivers.length)].id,
      });
    })
  );
}

export default async function init() {
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

  console.info("Checking if database needs to be seeded...");
  // Does database need to be seeded?
  const drivers = await Driver.findAll();
  if (!drivers.length) {
    console.info("Database needs to be seeded.");
    await seed();
    console.info("Database has been seeded.");
  }

  console.info("Database is ready.");
}
