import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchALLAnime } from '../api/jikanApi';
import { Loader } from '../components/Loader.tsx';
import s from '../styles/AnimeDetails.module.scss';
import { Star } from 'lucide-react';
import { useAnimeStore } from '../store/animeStore.tsx';
import { useNavigate } from 'react-router-dom';
import { Favorites, Watchlist } from '../api/FavoriteWatchlist';
import { AnimeTrailer } from '../components/anime-details/AnimeTrailer.tsx';
import { AnimeDescription } from '../components/anime-details/AnimeDescription.tsx';
import { AnimeActions } from '../components/anime-details/AnimeActions.tsx';
import { AnimeMeta } from '../components/anime-details/AnimeMeta.tsx';

export const AnimeDetails = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const setGenre = useAnimeStore((state) => state.setGenre);
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Allinfo', id],
    queryFn: () => fetchALLAnime(Number(id)),
    enabled: !!id && !isNaN(Number(id)),
  });

  const { data: isFav } = useQuery({
    queryKey: ['Favorit', data?.mal_id],
    queryFn: () => Favorites.isAdded(data!.mal_id),
    enabled: !!data?.mal_id,
  });
  const { data: isWah } = useQuery({
    queryKey: ['Warchlist', data?.mal_id],
    queryFn: () => Watchlist.isAdded(data!.mal_id),
    enabled: !!data?.mal_id,
  });

  const Fawchenger = useMutation({
    mutationFn: () =>
      isFav
        ? Favorites.remove(data!.mal_id)
        : Favorites.add({
            mal_id: data!.mal_id,
            title: data!.title,
            episodes: data!.episodes,
            score: data!.score,
            images: data!.images,
          }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['Favorit', data?.mal_id] });
    },
  });
  const Watchchenger = useMutation({
    mutationFn: () =>
      isWah
        ? Watchlist.remove(data!.mal_id)
        : Watchlist.add({
            mal_id: data!.mal_id,
            title: data!.title,
            episodes: data!.episodes,
            score: data!.score,
            images: data!.images,
          }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['Warchlist', data?.mal_id] });
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className={s.errorMessage}>Помилка з'єднання</div>;

  return (
    <div className={s.animeDetailsPage}>
      <h1 className={s.animeMainTitle}>{data?.title}</h1>

      <div className={s.animeContentWrapper}>
        {/* ЛІВА КОЛОНКА */}
        <div className={s.imgWithFawPlan}>
          <div className={s.posterContainer}>
            <img
              className={s.animePoster}
              src={data?.images?.jpg?.large_image_url}
              alt={data?.title}
            />
          </div>

          <AnimeActions
            isFav={isFav}
            isWah={isWah}
            onFavClick={() => Fawchenger.mutate()}
            onWahClick={() => Watchchenger.mutate()}
          ></AnimeActions>
        </div>

        {/* ПРАВА КОЛОНКА */}
        <div className={s.animeInfoSection}>
          <div className={s.infoGridContainer}>
            {/* Картка 1: Інформація */}
            <AnimeMeta
              type={data?.type ?? null}
              episodes={data?.episodes ?? null}
              status={data?.status ?? null}
              rating={data?.rating ?? null}
              genres={data?.genres ?? []}
              onGenreClick={(id) => {
                setGenre(id);
                navigate('/');
              }}
            />

            {/* Картка 2: Рейтинг */}
            <div className={s.infoBlock}>
              <h3 className={s.blockTitle}>Rating</h3>
              <div className={s.ratingContainer}>
                <div className={s.starsWrapper}>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    const rating = (data?.score || 0) / 2;
                    return (
                      <Star
                        key={index}
                        size={26}
                        fill={starValue <= rating ? '#4a90e2' : 'transparent'}
                        color={starValue <= rating ? '#4a90e2' : '#ccc'}
                        strokeWidth={1.5}
                      />
                    );
                  })}
                </div>
                <div className={s.scoreValue}>{data?.score}</div>
              </div>
            </div>
          </div>

          <AnimeDescription synopsis={data?.synopsis ?? null} />
        </div>
        <AnimeDescription
          synopsis={data?.synopsis ?? null}
          mobile
        ></AnimeDescription>
        <AnimeTrailer
          embedUrl={data?.trailer?.embed_url ?? null}
        ></AnimeTrailer>
      </div>
    </div>
  );
};
