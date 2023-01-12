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

export default router;
