import { useState } from 'react';
import { useAnimeStore } from '../store/Store';

export const Search = () => {
  const searchTerm = useAnimeStore((state) => state.searchTerm);
  const setSearchTerm = useAnimeStore((state) => state.setSearchTerm);
  const setGenre = useAnimeStore((state) => state.setGenre);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Input">
      {/* Лупа — кнопка тільки на малих екранах */}
      <button className="searchToggle" onClick={() => setIsOpen(!isOpen)}>
        🔍
      </button>

      {/* Input — завжди на великих, випадає на малих */}
      <input
        className={isOpen ? 'mobileOpen' : ''}
        type="text"
        placeholder="Пошук..."
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