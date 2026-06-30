const axios = require("axios");

function getPredictionUrl() {
  const endpoint = process.env.CUSTOM_VISION_ENDPOINT?.replace(/\/$/, "");
  const projectId = process.env.PROJECT_ID;
  const publishedName = process.env.PUBLISHED_NAME;

  if (!endpoint || !projectId || !publishedName) {
    throw new Error(
      "Missing Azure Custom Vision config. Set CUSTOM_VISION_ENDPOINT, PROJECT_ID, and PUBLISHED_NAME in .env"
    );
  }

  return `${endpoint}/customvision/v3.0/Prediction/${projectId}/classify/iterations/${publishedName}/image`;
}

/**
 * Send image bytes to Azure Custom Vision Prediction API.
 * @see https://learn.microsoft.com/en-us/azure/ai-services/custom-vision-service/quickstarts/image-classification
 */
async function classifyImage(imageBuffer) {
  const predictionKey = process.env.PREDICTION_KEY;
  if (!predictionKey) {
    throw new Error("Missing PREDICTION_KEY in environment variables.");
  }

  const url = getPredictionUrl();

  const response = await axios.post(url, imageBuffer, {
    headers: {
      "Prediction-Key": predictionKey,
      "Content-Type": "application/octet-stream",
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  return response.data;
}

module.exports = { classifyImage };
