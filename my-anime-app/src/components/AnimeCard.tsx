import { Link } from 'react-router-dom';
import type { Anime } from '../types/anime.types';

export const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="AnimeCard">
      <div className="AnimeImg">
        <img src={anime.images.jpg.image_url} alt="" />
      </div>

      <div>
        <h3>{anime.title}</h3>
      </div>

      <div className="Сard-info">
        <div>{anime.type}</div>
        <div>{anime.year || 'TBA'}</div>
      </div>
    </Link>
  );
};
