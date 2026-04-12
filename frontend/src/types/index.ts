// src/types/index.ts

export interface TopChar {
  char: string;
  prob: number;
}

export interface GenerationStep {
  top5: TopChar[];
  chosen: string;
}

export interface GenerateResponse {
  name: string;
  steps: GenerationStep[];
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
}

export interface Rashi {
  id: string;
  name: string;
  englishName: string;
  syllables: string[];
}