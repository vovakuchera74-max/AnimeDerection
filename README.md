爆 BLAST — Anime Explorer

> Сайт для пошуку, відстеження та оцінювання аніме

![alt text](image.png)
![alt text](image-1.png)

---

## 🌟 Можливості

- 🔍 **Пошук аніме** — миттєвий пошук по назві
- 🎭 **Фільтрація по жанрах** — Shounen, Isekai, Mecha, Drama, Seinen
- 📄 **Сторінка аніме** — опис, рейтинг, жанри, трейлер
- ❤️ **Улюблене** — додавай аніме в список обраних
- 📋 **Watchlist** — плануй що дивитись
- 🏆 **Тірліст** — розстав улюблені аніме по рангах (S/A/B/C/D/F)
- 👤 **Авторизація** — реєстрація та вхід, особистий профіль
- 🌙 **Темна/світла тема**
- 📱 **Адаптивний дизайн**

---

## 🛠 Стек

| Технологія | Призначення |
|---|---|
| React 18 | UI бібліотека |
| TypeScript | Типізація |
| Vite | Збірник |
| React Router | Навігація |
| TanStack Query | Запити та кешування |
| Zustand | Глобальний стан |
| SCSS Modules | Стилізація |
| Supabase | База даних та авторизація |
| Jikan API | Дані про аніме |
| @dnd-kit | Drag and drop для тірліста |
| Zod + React Hook Form | Валідація форм |
| Lucide React | Іконки |
| Vitest | Тести |

---

## 🚀 Запуск проекту

### 1. Клонуй репозиторій
```bash
git clone https://github.com/vovakuchera74-max/AnimeDerection.git
cd AnimeDerection/my-anime-app
npm install
```

### 2. Створи `.env` файл
```bash
VITE_SUPABASE_URL=твій_supabase_url
VITE_SUPABASE_ANON_KEY=твій_anon_key
```

### 3. Запуск
```bash
npm run dev
```

---

## 📁 Структура проекту
src/
│  
└── tests/
│     └──AnimeCade.test.tsx
│     └──useDebounce.test,tsx
├── api/
│   ├── authApi.ts
│   ├── FavoriteWatchlist.ts
│   ├── http.ts
│   ├── jikanApi.ts
│   ├── supabase.ts
│   └── tierlistApi.ts
├── components/
│   ├── anime-details/
│   ├── AnimeCard.tsx
│   ├── Header.tsx
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   └── useDebounce.ts
├── pages/
│   ├── Home.tsx
│   ├── AnimeDetails.tsx
│   ├── FavoritesPage.tsx
│   └── TierList.tsx
├── store/
│   └── animeStore.tsx
├── styles/
├── types/
    └── anime.types.ts


---

## 📝 Скрипти

```bash
npm run dev      # Запуск
npm run build    # Збірка
npm run test     # Тести
npm run lint     # Лінтинг
npm run format   # Форматування
```

---

## 🔗 API

Використовує [Jikan API](https://jikan.moe/) — неофіційний MyAnimeList API. Ліміт: 3 запити/сек.