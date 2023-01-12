// TODO: Add driver routes
import express from "express";

const server = express();

const PORT = 3001;

// Middleware to parse incoming request bodies (e.g. POST - CREATE)
server.use(express.json());

server.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

export default function init() {
  server.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
}
