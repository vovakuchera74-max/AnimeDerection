export interface Anime {
  mal_id: number;
  title: string;
  episodes: number;
  score: number;
  type: string;
  year: number;
  id?: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
}
export interface HeaderProps {
  isDark: boolean;
  changeTheme: () => void;
}

export interface FullAnime extends Anime {
  synopsis: string;
  background: string;
  status: string;
  rating: string;
  genres: { mal_id: number; name: string }[];
  studios: { name: string }[];
  trailer: {
    url: string;
    embed_url: string;
  };
}
export interface BaseAnime {
  mal_id: number;
  title: string;
  episodes: number | null;
  score: number | null;
  user_id?: string;

  image?: {
    jpg: { image_url: string; large_image_url: string };
  };
  images?: {
    jpg: { image_url: string; large_image_url: string };
  };
}
