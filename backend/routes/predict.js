const express = require("express");
const multer = require("multer");
const { predictCharacter } = require("../controllers/predictController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed."));
      return;
    }
    cb(null, true);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded. Use field name 'image'." });
    }

    const result = await predictCharacter(req.file.buffer);
    return res.json(result);
  } catch (error) {
    console.error("Prediction error:", error.message);

    if (error.message.includes("Missing Azure")) {
      return res.status(503).json({
        error: "Azure Custom Vision is not configured. Copy backend/.env.example to backend/.env and add your keys.",
      });
    }

    if (error.response?.status === 401) {
      const azureMsg = error.response?.data?.message ?? error.response?.data?.error?.message;
      return res.status(401).json({
        error:
          "Invalid Prediction Key or endpoint mismatch. Key and endpoint must both be from the same simpsonsml-prediction resource.",
        details: azureMsg,
        hint: "Endpoint should be https://simpsonsml-prediction.cognitiveservices.azure.com (not simpsonsml).",
      });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({
        error: "Model not found. Verify PROJECT_ID and PUBLISHED_NAME match your published iteration.",
      });
    }

    return res.status(500).json({
      error: "Prediction failed.",
      details: error.response?.data?.message ?? error.message,
    });
  }
});

router.get("/health", (_req, res) => {
  const configured = Boolean(
    process.env.PREDICTION_KEY &&
      process.env.CUSTOM_VISION_ENDPOINT &&
      process.env.PROJECT_ID &&
      process.env.PUBLISHED_NAME
  );

  res.json({
    status: "ok",
    azureConfigured: configured,
  });
});

module.exports = router;
