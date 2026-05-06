import { create } from "zustand";
interface AnimeState {
  isDark: boolean;
  selectedGenre: number | null;
  toggleTheme: () => void;
  setGenre: (id: number | null) => void;
  
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useAnimeStore = create<AnimeState>((set)=>({
  isDark: true,
  selectedGenre: null,
  
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setGenre: (id) => set({ selectedGenre: id }),
 
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
 
  
}))