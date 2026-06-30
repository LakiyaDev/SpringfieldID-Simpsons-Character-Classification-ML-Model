import type { PredictionResult } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export async function predictCharacter(image: File): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? data.details ?? "Prediction failed");
  }

  return data as PredictionResult;
}

export async function checkApiHealth(): Promise<{ azureConfigured: boolean }> {
  try {
    const response = await fetch(`${API_URL}/api/predict/health`);
    if (!response.ok) return { azureConfigured: false };
    const data = await response.json();
    return { azureConfigured: Boolean(data.azureConfigured) };
  } catch {
    return { azureConfigured: false };
  }
}
