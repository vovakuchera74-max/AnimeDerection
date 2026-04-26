# 爆 BLAST — Anime Explorer

> Сайт для пошуку та відстеження аніме з використанням публічного Jikan API

![alt text](image.png)
![alt text](image-1.png)

---

## 🌟 Можливості

- 🔍 **Пошук аніме** — миттєвий пошук по назві
- 🎭 **Фільтрація по жанрах** — Shounen, Isekai, Mecha, Drama, Seinen
- 📄 **Сторінка аніме** — детальна інформація: опис, рейтинг, жанри, кількість серій, трейлер
- ❤️ **Улюблене** — додавай аніме в список обраних
- 📋 **Watchlist** — плануй що дивитись
- 🌙 **Темна/світла тема** — перемикання теми
- 📱 **Адаптивний дизайн** — працює на всіх екранах

---

## 🛠 Стек

| Технологія     | Призначення |
|----------------|---------------|
| React 18       | UI бібліотека |
| TypeScript     | Типізація |
| Vite           | Збірник проекту |
| React Router   | Навігація |
| TanStack Query | Запити до API та кешування |
| Zustand        | Глобальний стан |
| SCSS Modules   | Стилізація |
| Jikan API      | Дані про аніме |
| JSON Server    | Локальна база даних (обране, watchlist) |
| Lucide React   | Іконки |

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
# Створи файл .env в корені проекту
VITE_API_URL=http://localhost:3001
```

### 3. Запусти проект

Потрібно запустити **два термінали одночасно**:

**Термінал 1 — JSON Server (база даних):**
```bash
cd my-anime-app
npm run server
```

**Термінал 2 — React додаток:**
```bash
cd my-anime-app
npm run dev
```

### 4. Відкрий в браузері

```
http://localhost:5173
```

---

## 📁 Структура проекту

```
src/
├── api/              # Запити до API
│   ├── jikanApi.ts       # Jikan API
│   └── FavoriteWatchlist.ts  # JSON Server
├── components/       # Компоненти
│   ├── AnimeCard.tsx
│   ├── Header.tsx
│   ├── LibraryCard.tsx
│   ├── Loader.tsx
│   └── Search.tsx
├── pages/            # Сторінки
│   ├── Home.tsx
│   ├── AnimeDetails.tsx
│   └── Faborites.tsx
├── store/            # Zustand стор
│   └── Store.tsx
├── styles/           # SCSS стилі
├── types/            # TypeScript типи
│   └── anime.types.ts
└── hooks/            # Кастомні хуки
    └── useDebounce.ts
```

---

## 📝 Скрипти

```bash
npm run dev      # Запуск React додатку
npm run server   # Запуск JSON Server
npm run build    # Збірка для продакшну
```

---

## 🔗 API

Проект використовує безкоштовний [Jikan API](https://jikan.moe/) — неофіційний MyAnimeList API. Ліміт запитів: 3 запити/сек.
