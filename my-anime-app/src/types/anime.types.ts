export interface Anime {
  mal_id: number;
  title: string;
  episodes:number;
  score:number;
  type:string;
  year:number;
  id?: string
  images: {
    jpg: {
      large_image_url:string;
      image_url: string;
    };
  };
}
export interface HeaderProps {
  isDark:boolean
  changeTheme:()=>void
}
// Він автоматично включає все, що є в Anime + нові поля
export interface FullAnime extends Anime {
  synopsis: string;        // Опис
  background: string;      // Історія створення
  status: string;          // Статус (Ongoing, Finished)
  rating: string;          // Віковий рейтинг (R-17+, PG-13)
 genres: { mal_id: number; name: string }[]; // Масив жанрів
  studios: { name: string }[]; // Студії
  trailer: {
    url: string;
    embed_url: string;
  };
}