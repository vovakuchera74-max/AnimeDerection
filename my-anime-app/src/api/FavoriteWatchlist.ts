import { supabase } from './supabase';
import type { BaseAnime } from '../types/anime.types.ts';

export const Favorites = {
  async add(anime: BaseAnime) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from('favorites').insert([
      {
        user_id: user?.id,
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('mal_id', mal_id)
      .eq('user_id', user?.id);

    return !error;
  },

  async isAdded(mal_id: number): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('favorites')
      .select('mal_id')
      .eq('mal_id', mal_id)
      .eq('user_id', user?.id)
      .single();

    return !!data;
  },
};

export const Watchlist = {
  async add(anime: BaseAnime) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from('watchlist').insert([
      {
        user_id: user?.id,
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('mal_id', mal_id)
      .eq('user_id', user?.id);

    return !error;
  },

  async isAdded(mal_id: number): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('watchlist')
      .select('mal_id')
      .eq('mal_id', mal_id)
      .eq('user_id', user?.id)
      .maybeSingle();

    return !!data;
  },
};
