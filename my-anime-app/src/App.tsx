import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AnimeDetails } from './pages/AnimeDetails';
import { Header } from './components/Header';
import { FavoriteWatchlist } from './pages/FavoritesPage.tsx';
import { Sign_in } from './components/Sign_in.tsx';
import { useAnimeStore } from './store/animeStore.tsx';
import { Sign_up } from './components/Sign_up.tsx';
import { Loader } from './components/Loader.tsx';
import { useAuth } from './hooks/useAuth.ts';
import { Navigate } from 'react-router-dom';
import { Tierlist } from './pages/TierList.tsx';
export default function App() {
  const isDark = useAnimeStore((state) => state.isDark);
const { user, loading } = useAuth()

if (loading) return <Loader />  // поки перевіряємо сесію

  return (
    <div className={`app-wrapper ${isDark ? 'dark' : 'light'}`}>
      {user?<Header />:null}

      <main>
        <Routes>
    {!user ? (
     
      <>
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/signin" element={<Sign_in />} />
        <Route path="*" element={<Navigate to="/signin" />} /> {/* будь-який інший шлях → signin */}
      </>
    ) : (
      
      <>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/FavoriteWatchlist" element={<FavoriteWatchlist />} />
         <Route path="/Tierlist" element={<Tierlist />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* будь-який інший шлях → головна */}
      </>
    )}
  </Routes>
      </main>
    </div>
  );
}
