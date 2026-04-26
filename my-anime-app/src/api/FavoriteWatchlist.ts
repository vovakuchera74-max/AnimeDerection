
interface ANIME{
  mal_id: number,
      title: string,
      episodes: number,
      id?: number;
      score: number,
      images: {
    jpg: {
      large_image_url:string;
      image_url: string;
    };
  }
}

// Тепер
const BASE_URL = import.meta.env.VITE_API_URL;
export const Favorites = {
  async add(anime: ANIME) {
    // Спочатку перевіряємо чи вже є
    const exists = await this.isAdded(anime.mal_id);
    if (exists) return false; // ← виходимо, не додаємо двічі

    const response = await fetch(`${BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anime),
    });
    return response.ok;
  },

  async remove(id: number) {
    // Знаходимо запис по mal_id щоб дістати id в json-server
    const all = await this.getAll();
    const record = all.find((item: ANIME) => item.mal_id === id);
    if (!record) return false; // ← нема що видаляти

    const response = await fetch(`${BASE_URL}/favorites/${record.id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },

  async getAll() {
    const response = await fetch(`${BASE_URL}/favorites`);
    return response.json();
  },

  // Перевірка — є чи нема
  async isAdded(mal_id: number): Promise<boolean> {
    const all = await this.getAll();
    return all.some((item: ANIME) => item.mal_id === mal_id);
  }
};
export const Watchlist = {
  async add(anime: ANIME) {
    // Спочатку перевіряємо чи вже є
    const exists = await this.isAdded(anime.mal_id);
    if (exists) return false; // ← виходимо, не додаємо двічі

    const response = await fetch(`${BASE_URL}/watchlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anime),
    });
    return response.ok;
  },

  async remove(id: number) {
    // Знаходимо запис по mal_id щоб дістати id в json-server
    const all = await this.getAll();
    const record = all.find((item: ANIME) => item.mal_id === id);
    if (!record) return false; // ← нема що видаляти

    const response = await fetch(`${BASE_URL}/watchlist/${record.id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },

  async getAll() {
    const response = await fetch(`${BASE_URL}/watchlist`);
    return response.json();
  },

  // Перевірка — є чи нема
  async isAdded(mal_id: number): Promise<boolean> {
    const all = await this.getAll();
    return all.some((item: ANIME) => item.mal_id === mal_id);
  }
};
