require("dotenv").config();

const express = require("express");
const cors = require("cors");
const predictRoutes = require("./routes/predict");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use("/api/predict", predictRoutes);

app.get("/", (_req, res) => {
  res.json({
    name: "Springfield ID API",
    endpoints: {
      predict: "POST /api/predict",
      health: "GET /api/predict/health",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Springfield ID backend running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\nPort ${PORT} is already in use. On macOS, port 5000 is often taken by AirPlay (Control Center).\n` +
        `Set PORT=5001 in backend/.env or stop the other process.\n`
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
