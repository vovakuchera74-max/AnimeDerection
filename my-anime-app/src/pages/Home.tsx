import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTopAnime } from '../api/jikanApi';
import { useAnimeStore } from '../store/Store';
import type { Anime } from '../types/anime.types';
import { AnimeCard } from '../components/AnimeCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Loader } from '../components/Loder';
import { useDebounce } from '../hooks/useDebounce';
export const Home = () => {

  const selectedGenre = useAnimeStore((state) => state.selectedGenre);
  const searchTerm = useAnimeStore((state) => state.searchTerm);
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { 
  data, 
  isLoading, 
  isError, 
  fetchNextPage, 
  hasNextPage, 
  isFetchingNextPage 
} = useInfiniteQuery({
  queryKey: ['anime', selectedGenre, debouncedSearch],
  queryFn: ({ pageParam }) => fetchTopAnime(selectedGenre, pageParam, debouncedSearch),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length < 20 ? undefined : allPages.length + 1;
  },
  staleTime: 1000 * 60 * 5,
});

  // Налаштовуємо бібліотеку
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
console.log(data)
  // Викликаємо наступну сторінку, коли бачимо останню картку
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Якщо вантажиться найперша сторінка
  if (isLoading) return <Loader />;
  if (isError) return <div style={{ textAlign: 'center', padding: '50px' }}>Помилка з з'єднанням</div>;

  // Витягуємо всі аніме в один масив
  // Додаємо захист (data?.pages || []), щоб flatMap не ламався
  const allAnime = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="home-container">
      <div className="anime-grid">
        {allAnime.map((anime: Anime, index) => {
          // Чи є ця картка останньою в списку?
          const isLast = allAnime.length === index + 1;

          return (
            <div 
              key={`${anime.mal_id}-${index}`} // Додав index до key для надійності
              ref={isLast ? ref : null}
            >
              <AnimeCard anime={anime} />
            </div>
          );
        })}
      </div>

      {/* Показуємо, коли довантажуємо наступні сторінки */}
      {isFetchingNextPage && (
  <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Loader />
  </div>
)}
    </div>
  );
};