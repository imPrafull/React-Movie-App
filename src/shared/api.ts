import { DateTime } from 'luxon';

interface RequestParams {
  [key: string]: string | number | boolean;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function httpGet<T>(endpoint: string, params: RequestParams = {}): Promise<T | null> {
  try {
    const queryParams = new URLSearchParams({
      api_key: API_KEY,
      ...params
    }).toString();

    const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return null;
  }
}