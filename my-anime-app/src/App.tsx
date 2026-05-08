import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AnimeDetails } from './pages/AnimeDetails';
import { Header } from './components/Header';
import { FavoriteWatchlist } from './pages/FavoritesPage.tsx';
import { Sign_in } from './components/Sign_in.tsx';
import { useAnimeStore } from './store/animeStore.tsx';
import { Sign_up } from './components/Sign_up.tsx';
export default function App() {
  const isDark = useAnimeStore((state) => state.isDark);

  return (
    <div className={`app-wrapper ${isDark ? 'dark' : 'light'}`}>
      <Header />

      <main>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<Sign_up />} />
          <Route path="/signup" element={<Sign_up />} />
          <Route path="/signin" element={<Sign_in />} />
          <Route path="/FavoriteWatchlist" element={<FavoriteWatchlist />} />

          {/* Сторінка конкретного аніме */}
          <Route path="/anime/:id" element={<AnimeDetails />} />
        </Routes>
      </main>
    </div>
  );
}
