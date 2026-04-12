// src/hooks/useNakshatra.ts
import { useState } from 'react';
import axios from 'axios';
import type { GenerateResponse, HealthResponse } from '@/types';

// Assuming your FastAPI server is running here
const API_BASE_URL = 'http://localhost:8000';

export function useNakshatra() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationData, setGenerationData] = useState<GenerateResponse | null>(null);

  // Optional: A quick check to see if the model is loaded in the backend
  const checkHealth = async () => {
    try {
      const res = await axios.get<HealthResponse>(`${API_BASE_URL}/health`);
      return res.data.status === 'ok';
    } catch {
      return false;
    }
  };

  const generateName = async (startSyllable?: string) => {
    setIsFetching(true);
    setError(null);
    setGenerationData(null); // Clear previous runs

    try {
      // If the user selected a specific syllable (not "any"), append it to the query
      const url = startSyllable && startSyllable !== 'any' 
        ? `${API_BASE_URL}/generate?start=${startSyllable}` 
        : `${API_BASE_URL}/generate`;

      const response = await axios.get<GenerateResponse>(url);
      setGenerationData(response.data);
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message === 'Network Error' 
          ? 'Cannot connect to backend. Is FastAPI running on port 8000?' 
          : err.response?.data?.detail || 'An error occurred during generation.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsFetching(false);
    }
  };

  return { 
    generateName, 
    checkHealth,
    isFetching, 
    error, 
    generationData 
  };
}