import { supabase } from './supabase';
import type { BaseAnime } from '../types/anime.types.ts';

export const Favorites = {
  async add(anime: BaseAnime) {
    const { error } = await supabase.from('favorites').insert([
      {
        mal_id: anime.mal_id,
        title: anime.title,
        episodes: anime.episodes,
        score: anime.score,
        image: anime.images,
      },
    ]);

    return !error;
  },

  async remove(mal_id: number) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('mal_id', mal_id);

    return !error;
  },

  async isAdded(mal_id: number): Promise<boolean> {
    const { data } = await supabase
      .from('favorites')
      .select('mal_id')
      .eq('mal_id', mal_id)
      .single();

    return !!data;
  },
};

export const Watchlist = {
  async add(anime: BaseAnime) {
    const { error } = await supabase.from('watchlist').insert([
      {
        mal_id: anime.mal_id,
        title: anime.title,
        episodes: anime.episodes,
        score: anime.score,
        image: anime.images,
      },
    ]);

    if (error) {
      console.error('Помилка додавання в Watchlist:', error.message);
      return false;
    }
    return true;
  },

  async remove(mal_id: number) {
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('mal_id', mal_id);

    return !error;
  },

  async isAdded(mal_id: number): Promise<boolean> {
    const { data } = await supabase
      .from('watchlist')
      .select('mal_id')
      .eq('mal_id', mal_id)
      .maybeSingle();

    return !!data;
  },
};
