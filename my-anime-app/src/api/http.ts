const BASE_URL = 'https://api.jikan.moe/v4';

export const httpGet = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(BASE_URL + endpoint);
  if (!response.ok) throw new Error(`Помилка API: ${response.status}`);
  const result = await response.json();
  return result.data;
};
