import s from '../../styles/AnimeDetails.module.scss';

interface AnimeTrailerProps {
  embedUrl: string | null;
}

export const AnimeTrailer = ({ embedUrl }: AnimeTrailerProps) => {
  return (
    <div className={s.videoSection}>
      <h3 className={s.sectionTitle}>Trailer</h3>
      {embedUrl ? (
        <div className={s.videoContainer}>
          <iframe
            src={embedUrl}
            title="Anime Trailer"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={s.videoIframe}
          ></iframe>
        </div>
      ) : (
        <p className={s.noVideo}>На жаль, відео недоступне</p>
      )}
    </div>
  );
};
