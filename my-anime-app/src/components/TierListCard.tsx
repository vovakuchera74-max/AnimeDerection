import s from '../styles/AnimeCardTierlist.module.scss';
import { useDraggable } from '@dnd-kit/core';
interface TierListCardProps {
  id: string;
  imageUrl: string;
}

export const TierListCard = ({ id, imageUrl }: TierListCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={s.AnimeCardTierlist}
    >
      <img className={s.Cards} src={imageUrl} alt="anime-poster" />
    </div>
  );
};
