import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface TierRowProps {
  tier: string; // ID нашого рядка (наприклад: 'S', 'A', 'pool')
  children: React.ReactNode; // Картки аніме, які будуть всередині
}

export const TierRow = ({ tier, children }: TierRowProps) => {
  // Хук useDroppable каже бібліотеці dnd-kit, що цей div — зона для приземлення карток
  const { setNodeRef, isOver } = useDroppable({
    id: tier, // Обов'язково передаємо унікальний ID рядка
  });

  // Можеш додати легку стилізацію, щоб рядок підсвічувався, коли над ним летить картка
  const style = {
    backgroundColor: isOver ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    transition: 'background-color 0.2s ease',
    minHeight: '100px',
    width: '100%',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
