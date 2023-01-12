import { Router } from "express";
import driverController from "./controller.js";

const router = new Router();

router.get("/", (_, res) => {
  driverController
    .index()
    .then((drivers) => {
      res.json(drivers);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const foundDriver = await driverController.show(id).catch((err) => {
    res.status(500).json({ error: err.message });
  });

  if (foundDriver) {
    res.json(foundDriver);
  } else {
    res.status(404).json({ message: "Driver not found" });
  }
});

export default router;
