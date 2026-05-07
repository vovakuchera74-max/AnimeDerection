import s from '../../styles/AnimeDetails.module.scss';

interface AnimeDescriptionProps {
  synopsis: string | null;
  mobile?: boolean;
}

export const AnimeDescription = ({
  synopsis,
  mobile,
}: AnimeDescriptionProps) => {
  return (
    <div className={mobile ? s.opsBlocMobile : s.opsBloc}>
      <h3 className={s.sectionTitle}>Description</h3>
      <p className={s.synopsisText}>{synopsis}</p>
    </div>
  );
};
