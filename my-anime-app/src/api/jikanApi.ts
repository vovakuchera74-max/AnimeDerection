import type { Anime } from "../types/anime.types";
import type { FullAnime } from "../types/anime.types";
const BASE_URL = "https://api.jikan.moe/v4";
export const fetchTopAnime = async (
  genreId: number | null, 
  pageParam: number = 1, 
  search: string = ""
): Promise<Anime[]> => {
  let url = '';
  // Якщо є пошуковий запит - він має найвищий пріоритет
  if (search.trim().length > 0) {
    url = `${BASE_URL}/anime?q=${search}&page=${pageParam}&limit=20`;
  } 
  // Якщо пошуку немає, але обрано жанр (твій робочий код)
  else if (genreId !== null) {
    url = `${BASE_URL}/anime?genres=${genreId}&limit=20&page=${pageParam}`;
  } 
  // Просто топ (твій робочий код)
  else {
    url = `${BASE_URL}/top/anime?limit=20&page=${pageParam}`;
  }

  const response = await fetch(url);
  
  // Якщо сервер видає 429 (багато запитів) або 504 - ми просто кидаємо помилку
  if (!response.ok) throw new Error(`Помилка API: ${response.status}`);
  
  const result = await response.json();
  return result.data;
};
export const fetchALLAnime = async (id:number): Promise<FullAnime> => {
  

  const response = await fetch(`${BASE_URL}/anime/${id}/full`);
  
  // Якщо сервер видає 429 (багато запитів) або 504 - ми просто кидаємо помилку
  if (!response.ok) throw new Error(`Помилка API: ${response.status}`);
  const result = await response.json();
  return result.data;
};