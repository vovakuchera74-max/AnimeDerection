import s from '../../styles/AnimeDetails.module.scss';
import { Tv, Clock, Star, BookOpen, Hash } from 'lucide-react';

interface AnimeMetaProps {
  type: string | null;
  episodes: number | null;
  status: string | null;
  rating: string | null;
  genres: { mal_id: number; name: string }[];
  onGenreClick: (id: number) => void;
}

export const AnimeMeta = ({
  type,
  episodes,
  status,
  rating,
  genres,
  onGenreClick,
}: AnimeMetaProps) => {
  return (
    <div className={s.infoBlock}>
      <h3 className={s.blockTitle}>Information</h3>
      <div className={s.infoLeft}>
        <div className={s.infoItem}>
          <Tv size={20} />
          <span className={s.infoLabel}>Type:</span> {type}
        </div>
        <div className={s.infoItem}>
          <Hash size={20} />
          <span className={s.infoLabel}>Episodes:</span> {episodes || '?'}
        </div>
        <div className={s.infoItem}>
          <Clock size={20} />
          <span className={s.infoLabel}>Status:</span> {status}
        </div>
        <div className={s.infoItem}>
          <Star size={20} />
          <span className={s.infoLabel}>Rating:</span> {rating}
        </div>
        <div className={s.infoItem}>
          <BookOpen size={20} />
          <span className={s.infoLabel}>Genres:</span>
          <span className={s.genresList}>
            {genres?.map((genre, index) => (
              <span
                key={index}
                className={s.genreTag}
                onClick={() => onGenreClick(genre.mal_id)}
              >
                {genre.name}
              </span>
            )) || 'Не вказано'}
          </span>
        </div>
      </div>
    </div>
  );
};
