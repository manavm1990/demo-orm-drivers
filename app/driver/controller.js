import Car from "../car/model.js";
import sequelize from "../conn.js";
import License from "../license/model.js";
import Driver from "./model.js";

export default {
  // Get all drivers
  index() {
    return Driver.findAll({
      attributes: {
        include: [
          [
            // Use plain SQL to add up the total mileage
            // ℹ️ It's generally faster to go ahead and get this done at the database level than waiting for the app to do it
            // https://stackoverflow.com/a/66037696/1653236
            sequelize.literal(
              "(SELECT SUM(mileage) FROM cars WHERE cars.driver_id = driver.id)"
            ),
            "totalMileage",
          ],
        ],
      },
      include: [License, Car],
    });
  },

  // Get a driver by id
  show(id) {
    return Driver.findByPk(id, {
      attributes: {
        include: [
          [
            // Use plain SQL to add up the total mileage
            // ℹ️ It's generally faster to go ahead and get this done at the database level than waiting for the app to do it
            // https://stackoverflow.com/a/66037696/1653236
            sequelize.literal(
              "(SELECT SUM(mileage) FROM cars WHERE cars.driver_id = driver.id)"
            ),
            "totalMileage",
          ],
        ],
      },
      include: [License, Car],
    });
  },
};
