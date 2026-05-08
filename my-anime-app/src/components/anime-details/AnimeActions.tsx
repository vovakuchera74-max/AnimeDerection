import s from '../../styles/AnimeDetails.module.scss';
import { Heart, List } from 'lucide-react';
interface AnimeActionsProps {
  isFav: boolean | undefined;
  isWah: boolean | undefined;
  onFavClick: () => void;
  onWahClick: () => void;
}

export const AnimeActions = ({
  isFav,
  isWah,
  onFavClick,
  onWahClick,
}: AnimeActionsProps) => {
  return (
    <div className={s.fawPlan}>
      <button onClick={onFavClick} className={s.btnFaw}>
        <Heart
          fill={isFav ? 'red' : 'transparent'}
          color={isFav ? 'red' : 'white'}
          size={20}
        />
      </button>
      <button onClick={onWahClick} className={s.btnPlan}>
        <List
          fill={isWah ? '#4a90e2' : 'transparent'}
          color={isWah ? '#4a90e2' : 'white'}
          size={20}
        />
      </button>
    </div>
  );
};
