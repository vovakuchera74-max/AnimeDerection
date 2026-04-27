import s from '../styles/FavoriteWatchlist.module.scss'
import { useQuery } from '@tanstack/react-query';
import {Loader} from '../components/Loder'
import type {Anime} from '../types/anime.types'
import { LibraryCard } from '../components/LibraryCard';
// Замість

// Тепер
const BASE_URL = import.meta.env.VITE_API_URL;
interface Library {
  favorites: Anime[];
  watchlist: Anime[];
}

export const FavoriteWatchlist = ()=>{
    
    const fetchFavoriteWatchlist = async (): Promise<Library> => {
  const [favRes, watchRes] = await Promise.all([
   fetch(`${BASE_URL}/favorites`),
   fetch(`${BASE_URL}/watchlist`),
  ]);

  const favorites = await favRes.json();
  const watchlist = await watchRes.json();

  return { favorites, watchlist };
};

const { data, isLoading, isError } = useQuery({
    queryKey: ['library'],
    queryFn: async () => fetchFavoriteWatchlist()
});
if (isLoading) return <Loader />;
if (isError) return <div>Помилка з'єднання</div>;
    return(
        // гловний блок
        <div className={s.FavoriteWatchlist}>
            {/* частина з олоблений */}
            <div className={s.Favorite}>
                <h3 className={s.Favorite_header}>⭐Favorite</h3>
                <div className={s.Favorite_card}>{data?.favorites.map((anime) => (
  <LibraryCard key={anime.mal_id} anime={anime} />
))}</div>
            </div>
            {/* Частина з планую */}
            <div className={s.Watchlist}>
                <h3 className={s.Watchlist_header}>🕒Watchlist</h3>
                <div className={s.Watchlist_card}>{data?.watchlist.map((anime) => (
  <LibraryCard key={anime.mal_id} anime={anime} />
))}</div>
            </div>

        </div>
    )
}
