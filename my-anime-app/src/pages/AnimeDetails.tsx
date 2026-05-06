import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchALLAnime } from "../api/jikanApi";
import { Loader } from "../components/Loader.tsx"; 
import s from '../styles/AnimeDetails.module.scss';
import { Heart,List,Tv, Clock, Star, BookOpen, Hash } from 'lucide-react';
import { useAnimeStore } from "../store/animeStore.tsx";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Favorites,Watchlist } from "../api/FavoriteWatchlist";
export const AnimeDetails = () => {


  const [isFav, setIsFav] = useState(false);
  const [isWah, setIsWah] = useState(false);
  
  const navigate = useNavigate()
  const setGenre = useAnimeStore((state) => state.setGenre);
    const { id } = useParams<{ id: string }>();
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Allinfo', id],
        queryFn: () => fetchALLAnime(Number(id)),
        enabled: !!id && !isNaN(Number(id)),
    });
    useEffect(() => {
  if (data?.mal_id) {
    Favorites.isAdded(data.mal_id).then(setIsFav);
  }
}, [data?.mal_id]);
 useEffect(() => {
  if (data?.mal_id) {
    Watchlist.isAdded(data.mal_id).then(setIsWah);
  }
}, [data?.mal_id]);

    if (isLoading) return <Loader />;
    if (isError) return <div className={s.errorMessage}>Помилка з'єднання</div>;
    
const handleFav = async () => {
  if (!data) return;

  if (isFav) {
    await Favorites.remove(data.mal_id); 
  } else {
    await Favorites.add({             
      mal_id: data.mal_id,
      title: data.title,
      episodes: data.episodes,
      score: data.score,
      images: data.images,
    });
  }

  setIsFav(!isFav);
};
const handleWah = async () => {
  if (!data) return;

  if (isWah) {
    await Watchlist.remove(data.mal_id); 
  } else {
    await Watchlist.add({               
      mal_id: data.mal_id,
      title: data.title,
      episodes: data.episodes,
      score: data.score,
      images: data.images,
    });
  }

  setIsWah(!isWah); 
};
    return (
        <div className={s.animeDetailsPage}>
            <h1 className={s.animeMainTitle}>{data?.title}</h1>
             
            <div className={s.animeContentWrapper}>
                {/* ЛІВА КОЛОНКА */}
                <div className={s.imgWithFawPlan}>
                    <div className={s.posterContainer}>
                        <img 
                            className={s.animePoster} 
                            src={data?.images?.jpg?.large_image_url} 
                            alt={data?.title} 
                        />
                    </div>
                    
                   <div className={s.fawPlan}>
    <button className={s.btnFaw} onClick={handleFav} title="Додати в улюблене">
  <Heart
    size={20}
    fill={isFav ? "red" : "transparent"} // ← заповнене або порожнє
    color={isFav ? "red" : "white"}       // ← колір обводки
  />
</button>
    <button className={s.btnPlan} onClick={handleWah} title="Додати в плани">
        <List
    size={20}
    fill={isWah ? "#4a90e2" : "transparent"} // ← синій або прозорий
    color={isWah ? "#4a90e2" : "white"}       // ← колір обводки
  />
    </button>
</div>
                </div>
                  
                {/* ПРАВА КОЛОНКА */}  
                <div className={s.animeInfoSection}>
                    
                    <div className={s.infoGridContainer}>
  {/* Картка 1: Інформація */}
  <div className={s.infoBlock}>
    <h3 className={s.blockTitle}>Information</h3>
    <div className={s.infoLeft}>
<div className={s.infoItem}>
  <Tv size={20} />
  <span className={s.infoLabel}>Type:</span> {data?.type}
</div>

<div className={s.infoItem}>
  <Hash size={20} />
  <span className={s.infoLabel}>Episodes:</span> {data?.episodes || '?'}
</div>

<div className={s.infoItem}>
  <Clock size={20} />
  <span className={s.infoLabel}>Status:</span> {data?.status}
</div>

<div className={s.infoItem}>
  <Star size={20} />
  <span className={s.infoLabel}>Rating:</span> {data?.rating}
</div>

<div className={s.infoItem}>
  <BookOpen size={20} />
  <span className={s.infoLabel}>Genres:</span> 
  <span className={s.genresList}>
    {data?.genres?.map((genre, index) => (
      <span key={index} className={s.genreTag} onClick={() => {
      setGenre(genre.mal_id); 
      navigate('/');          
    }}>
        {genre.name}
      </span>
    )) || 'Не вказано'}
  </span>
</div>
    </div>
  </div>

  {/* Картка 2: Рейтинг */}
  <div className={s.infoBlock}>
    <h3 className={s.blockTitle}>Rating</h3>
    <div className={s.ratingContainer}>
      <div className={s.starsWrapper}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          const rating = (data?.score || 0) / 2;
          return (
            <Star key={index} size={26} fill={starValue <= rating ? "#4a90e2" : "transparent"} color={starValue <= rating ? "#4a90e2" : "#ccc"} strokeWidth={1.5} />
          );
        })}
      </div>
      <div className={s.scoreValue}>{data?.score}</div>
    </div>
  </div>
</div>

                    <div className={s.opsBloc}>
                        <h3 className={s.sectionTitle}>Description</h3>
                        <p className={s.synopsisText}>{data?.synopsis}</p>
                    </div>

                   
                </div>
<div className={s.opsBlocMobile}>
  <h3 className={s.sectionTitle}>Description</h3>
  <p className={s.synopsisText}>{data?.synopsis}</p>
</div>
                <div className={s.videoSection}>
    <h3 className={s.sectionTitle}>Treiler</h3>
    {data?.trailer?.embed_url ? (
        <div className={s.videoContainer}>
            <iframe
                src={data.trailer.embed_url}
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
            </div>
        </div>
    );
};