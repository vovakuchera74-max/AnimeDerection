import s from "../styles/AnimeCardTierlist.module.scss"
interface TierListCardProps {
  id: string;  
  imageUrl: string; 

}

export const TierListCard = ({ id, imageUrl}: TierListCardProps) => {
  return (
    <div className={s.AnimeCardTierlist}>
      <img 
        className={s.Cards} 
        src={imageUrl} 
        alt="anime-poster"
      />
    </div>
  )
}