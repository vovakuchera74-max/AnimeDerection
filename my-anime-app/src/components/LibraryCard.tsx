// components/LibraryCard.tsx
import { Star } from 'lucide-react';
import type { Anime } from '../types/anime.types';
import s from "../styles/LivraryCard.module.scss";
import { useNavigate } from 'react-router-dom';

interface Props {
  anime: Anime;
}

export const LibraryCard = ({ anime }: Props) => {
    const navigate = useNavigate();
  return (
    <div className={s.card} onClick={() => navigate(`/anime/${anime.mal_id}`)}>
        
      <img
        className={s.image}
        src={anime.images.jpg.image_url}
        alt={anime.title}
      />
      <div className={s.info}>
        <p className={s.title}>{anime.title}</p>
        <p className={s.episodes}>{anime.episodes} еп.</p>
      </div>
      <div className={s.rating}>
        <Star size={22} color="#4a90e2" fill="#4a90e2" />
        <span className={s.score}>{anime.score}</span>
      </div>
    </div>
  );
};