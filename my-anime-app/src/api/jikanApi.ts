import type { Anime } from "../types/anime.types";
import type { FullAnime } from "../types/anime.types";
import {httpGet} from "./http"
export const fetchTopAnime = async (
  genreId: number | null,
  pageParam: number = 1,
  search: string = ""
): Promise<Anime[]> => {
  
  // тільки логіка URL — більше нічого
  let endpoint = '';
  if (search.trim().length > 0) {
    endpoint = `/anime?q=${search}&page=${pageParam}&limit=20`;
  } else if (genreId !== null) {
    endpoint = `/anime?genres=${genreId}&limit=20&page=${pageParam}`;
  } else {
    endpoint = `/top/anime?limit=20&page=${pageParam}`;
  }

  return httpGet<Anime[]>(endpoint) // ← fetch/json/перевірка — в httpGet
}
export const fetchALLAnime = async (id:number): Promise<FullAnime> => {
  
  return httpGet<FullAnime>(`/anime/${id}/full`)

};