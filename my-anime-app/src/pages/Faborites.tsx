import s from '../styles/FavoriteWatchlist.module.scss'
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../components/Loder'
import type { Anime } from '../types/anime.types'
import { LibraryCard } from '../components/LibraryCard';
import { supabase } from '../api/supabase'; 

export const FavoriteWatchlist = () => {
    
    const fetchFavoriteWatchlist = async () => {
      
        const [favs, watch] = await Promise.all([
            supabase.from('favorites').select('*').order('created_at', { ascending: false }),
            supabase.from('watchlist').select('*').order('created_at', { ascending: false })
        ]);

        if (favs.error) throw favs.error;
        if (watch.error) throw watch.error;

        return { 
            favorites: favs.data as Anime[], 
            watchlist: watch.data as Anime[] 
        };
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['library'],
        queryFn: fetchFavoriteWatchlist
    });

    if (isLoading) return <Loader />;
    if (isError) return <div>Помилка завантаження з бази</div>;

    return (
        <div className={s.FavoriteWatchlist}>
            <div className={s.Favorite}>
                <h3 className={s.Favorite_header}>⭐Favorite</h3>
                <div className={s.Favorite_card}>
                    {data?.favorites.map((anime) => (
                        <LibraryCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </div>

            <div className={s.Watchlist}>
                <h3 className={s.Watchlist_header}>🕒Watchlist</h3>
                <div className={s.Watchlist_card}>
                    {data?.watchlist.map((anime) => (
                        <LibraryCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </div>
        </div>
    )
}