import Car from "../car/model.js";
import License from "../license/model.js";
import Driver from "./model.js";

export default {
  // Get all drivers
  index() {
    return Driver.findAll({ include: [License, Car] });
  },

  // Get a driver by id
  show(id) {
    return Driver.findByPk(id, { include: [License, Car] });
  },
};
