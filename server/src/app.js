import express from "express";

import documentRoutes from "./routes/document.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Luma API is running",
  });
});

app.use("/api/documents", documentRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Luma server running on port ${PORT}`);
});