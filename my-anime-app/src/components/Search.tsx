import { useState } from 'react';
import { useAnimeStore } from '../store/Store';
import { Search } from 'lucide-react';

export const Search1 = () => {
  const searchTerm = useAnimeStore((state) => state.searchTerm);
  const setSearchTerm = useAnimeStore((state) => state.setSearchTerm);
  const setGenre = useAnimeStore((state) => state.setGenre);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Input">
      {/* Лупа — кнопка тільки на малих екранах */}
      <button className="searchToggle" onClick={() => setIsOpen(!isOpen)}>
        <Search size={30} color="white" className="searchIcon" />
      </button>

      <Search size={28} color="white" className="searchIcon1" />
      <input
        className={isOpen ? 'mobileOpen' : ''}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value.trim().length > 0) {
            setGenre(null);
          }
        }}
      />
    </div>
  );
};