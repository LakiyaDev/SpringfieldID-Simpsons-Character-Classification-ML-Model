const characters = require("../data/characters.json");
const { classifyImage } = require("../services/customVision");

function normalizeTagName(tagName) {
  return tagName.trim();
}

function findCharacterMetadata(tagName) {
  const normalized = normalizeTagName(tagName);

  if (characters[normalized]) {
    return characters[normalized];
  }

  const match = Object.entries(characters).find(
    ([key]) => key.toLowerCase() === normalized.toLowerCase()
  );

  return match ? match[1] : null;
}

async function predictCharacter(imageBuffer) {
  const azureResult = await classifyImage(imageBuffer);

  const predictions = (azureResult.predictions ?? [])
    .map((p) => ({
      tagName: normalizeTagName(p.tagName),
      probability: p.probability,
      confidence: Math.round(p.probability * 10000) / 100,
    }))
    .sort((a, b) => b.probability - a.probability);

  const top = predictions[0];

  if (!top) {
    return {
      character: "Unknown",
      confidence: 0,
      predictions: [],
      metadata: null,
    };
  }

  const metadata = findCharacterMetadata(top.tagName);

  return {
    character: metadata?.displayName ?? top.tagName,
    tagName: top.tagName,
    confidence: top.confidence,
    predictions: predictions.slice(0, 5),
    metadata,
  };
}

module.exports = { predictCharacter };
