export interface CharacterMetadata {
  displayName: string;
  occupation: string;
  family: string[];
  personality: string[];
  episodes: string;
  quote: string;
  description: string;
  color: string;
}

export interface PredictionItem {
  tagName: string;
  probability: number;
  confidence: number;
}

export interface PredictionResult {
  character: string;
  tagName?: string;
  confidence: number;
  predictions: PredictionItem[];
  metadata: CharacterMetadata | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: PredictionResult;
  previewUrl: string;
}
