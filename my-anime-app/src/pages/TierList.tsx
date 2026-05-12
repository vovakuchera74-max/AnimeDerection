import s from "../styles/TierList.module.scss"



export const Tierlist = () => {
  const tierNames = ['S', 'A', 'B', 'C', 'D', 'F'];

  return (
    <div className={s.TierlistPAge}>
    <div className={s.TierListBlock}>
      {/* Рендеримо основні ряди */}
      {tierNames.map((tier) => (
        <div key={tier} className={s.TierListRow}>
          <div className={`${s.TierListNumbering} ${s[`tier${tier}`]}`}>
            {tier}
          </div>
          <div className={s.Animerow}>
            авііііііііііііііііііііііііііі
          </div>
        </div>
      ))}

      {/* Блок для аніме, які ще не в тірлісті */}
      <div className={s.AnimePhotosBlock}>
       авііііііііі
      </div>
    </div>
    </div>
  );
}