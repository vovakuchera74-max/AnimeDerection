import s from '../styles/TierList.module.scss';
import { supabase } from '../api/supabase';
import { useQuery } from '@tanstack/react-query';
import { TierListCard } from '../components/TierListCard';
import { DndContext, type DragEndEvent } from '@dnd-kit/core'; // Додав DragEndEvent
import { useState, useEffect } from 'react';
import { TierRow } from '../components/TierRow';
import { tierlistApi } from '../api/tierlistApi';
interface AnimeItem {
  mal_id: number;
  image?: { jpg?: { image_url?: string } };
  tier?: string; // Додаємо це поле сюди
}

export const Tierlist = () => {
  const [tierItems, setTierItems] = useState<Record<string, number[]>>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
    pool: [],
  });

  const tierNames = ['S', 'A', 'B', 'C', 'D', 'F'];

  // 2. Головна магія об'єднання двох таблиць
  async function getAll(): Promise<AnimeItem[]> {
    // Запускаємо обидва запити одночасно, щоб не чекати їх по черзі
    const [favoritesResponse, tierlistResponse] = await Promise.all([
      supabase.from('favorites').select('*'),
      tierlistApi.getAll(), // Викликаємо твою готову функцію, яка дістає тіри для поточного юзера
    ]);

    const favoritesData = favoritesResponse.data || [];
    const tierlistData = tierlistResponse || [];

    // Об'єднуємо: беремо аніме з favorites і додаємо йому tier, якщо він знайшовся в таблиці tierlist
    const fullData = favoritesData.map((anime: any) => {
      const savedTier = tierlistData.find(
        (t: any) => t.mal_id === anime.mal_id
      );
      return {
        ...anime,
        tier: savedTier ? savedTier.tier : 'pool', // якщо немає в тірлісті — відправляємо в пул
      };
    });

    return fullData;
  }

  const { data } = useQuery({
    queryKey: ['TierList'],
    queryFn: () => getAll(),
  });

  // 3. Цей useEffect залишається таким же, але тепер він працює з правильними даними!
  useEffect(() => {
    if (data && data?.length > 0) {
      const initialTiers: Record<string, number[]> = {
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        F: [],
        pool: [],
      };

      data.forEach((anime) => {
        const currentTier = anime.tier || 'pool';
        if (initialTiers[currentTier]) {
          initialTiers[currentTier].push(anime.mal_id);
        } else {
          initialTiers.pool.push(anime.mal_id);
        }
      });

      setTierItems(initialTiers);
    }
  }, [data]);

  // 1. НАШ НОВИЙ ОБРОБНИК: спрацьовує, коли відпустили картку
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Якщо кинули повз будь-яку зону — ігноруємо
    if (!over) return;

    const mal_id = Number(active.id); // ID картки, яку тягнули
    const targetTier = String(over.id); // ID рядка, куди її кинули

    setTierItems((prev) => {
      // Крок А: Пробігаємося по всіх поточних рядках і видаляємо цю картку звідти, де вона була
      const newState = Object.fromEntries(
        Object.entries(prev).map(([key, val]) => [
          key,
          val.filter((id) => id !== mal_id),
        ])
      );

      // Крок Б: Додаємо картку в масив того рядка, куди її скинули
      newState[targetTier] = [...newState[targetTier], mal_id];

      return newState;
    });
    tierlistApi.updateTier(mal_id, targetTier);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={s.TierlistPAge}>
        <div className={s.TierListBlock}>
          {/* РЯДКИ ТІРЛІСТА */}
          {tierNames.map((tier) => (
            <div key={tier} className={s.TierListRow}>
              <div className={`${s.TierListNumbering} ${s[`tier${tier}`]}`}>
                {tier}
              </div>
              <div className={s.Animerow}>
                {/* 1. Додаємо посадкову зону для кожного рядка */}
                <TierRow tier={tier}>
                  {/* Рендеримо картки, які належать саме цьому рядку */}
                  {tierItems[tier].map((mal_id) => {
                    const anime = data?.find((a) => a.mal_id === mal_id);
                    return (
                      <TierListCard
                        key={mal_id}
                        id={String(mal_id)}
                        imageUrl={anime?.image?.jpg?.image_url || ''}
                      />
                    );
                  })}
                </TierRow>
              </div>
            </div>
          ))}

          {/* НИЖНІЙ БЛОК (ПУЛ) */}
          <div className={s.AnimePhotosBlock}>
            {/* 2. Огортаємо пул у таку ж посадкову зону, щоб картки можна було кидати назад */}
            <TierRow tier="pool">
              {tierItems.pool.map((mal_id) => {
                const anime = data?.find((a) => a.mal_id === mal_id);
                return (
                  <TierListCard
                    key={mal_id}
                    id={String(mal_id)}
                    imageUrl={anime?.image?.jpg?.image_url || ''}
                  />
                );
              })}
            </TierRow>
          </div>
        </div>
      </div>
    </DndContext>
  );
};
