import express from "express";
import driverRoutes from "./driver/routes.js";

const server = express();

const PORT = 3001;

export default function init() {
  // Middleware to parse incoming request bodies (e.g. POST - CREATE)
  server.use(express.json());

  // Routes
  server.use("/api/drivers", driverRoutes);

  server.use((_, res) => {
    res.status(404).json({ message: "Not found" });
  });

  server.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
}
