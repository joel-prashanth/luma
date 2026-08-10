const express = require("express");

const documentRoutes = require("./routes/document.routes");

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
