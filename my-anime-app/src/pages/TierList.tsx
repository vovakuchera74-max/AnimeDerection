import s from '../styles/TierList.module.scss';
import { supabase } from '../api/supabase';
import { useQuery } from '@tanstack/react-query';
import { TierListCard } from '../components/TierListCard';
import { DndContext, type DragEndEvent ,useSensors,MouseSensor,
  TouchSensor,useSensor} from '@dnd-kit/core'; // Додав DragEndEvent
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

  
  async function getAll(): Promise<AnimeItem[]> {
  
    const [favoritesResponse, tierlistResponse] = await Promise.all([
      supabase.from('favorites').select('*'),
      tierlistApi.getAll(),
    ]);

    const favoritesData = favoritesResponse.data || [];
    const tierlistData = tierlistResponse || [];

    const fullData = favoritesData.map((anime: AnimeItem) => {
      const savedTier = tierlistData.find(
        (t: AnimeItem) => t.mal_id === anime.mal_id
      );
      return {
        ...anime,
        tier: savedTier ? savedTier.tier : 'pool',
      };
    });

    return fullData;
  }

  const { data } = useQuery({
    queryKey: ['TierList'],
    queryFn: () => getAll(),
  });

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    
    if (!over) return;

    const mal_id = Number(active.id); 
    const targetTier = String(over.id); 

    setTierItems((prev) => {
      
      const newState = Object.fromEntries(
        Object.entries(prev).map(([key, val]) => [
          key,
          val.filter((id) => id !== mal_id),
        ])
      );

     
      newState[targetTier] = [...newState[targetTier], mal_id];

      return newState;
    });
    tierlistApi.updateTier(mal_id, targetTier);
  };
  const sensors = useSensors(
  useSensor(MouseSensor),
  useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })
)

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className={s.TierlistPAge}>
        <div className={s.TierListBlock}>
          {/* РЯДКИ ТІРЛІСТА */}
          {tierNames.map((tier) => (
            <div key={tier} className={s.TierListRow}>
              <div className={`${s.TierListNumbering} ${s[`tier${tier}`]}`}>
                {tier}
              </div>
              <div className={s.Animerow}>
             
                <TierRow tier={tier}>
                 
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

         
          <div className={s.AnimePhotosBlock}>
           
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
