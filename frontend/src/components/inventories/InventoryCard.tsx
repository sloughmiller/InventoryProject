// src/components/cards/InventoryCard.tsx
import React from 'react';
import BaseCard from '../cards/BaseCard';
import type { Inventory } from '../../types';

type Props = {
  inventory: Inventory;
  onRename?: (inventory: Inventory) => void;
  onDelete?: (inventory: Inventory) => void;
  onSelect?: (inventory: Inventory) => void;
};

const InventoryCard: React.FC<Props> = ({ inventory, onRename, onDelete, onSelect }) => {
  const isSelectable = typeof onSelect === 'function';

  const handleClick = () => {
    if (isSelectable) onSelect?.(inventory);
  };

  return (
    <div
      onClick={handleClick}
      className={isSelectable ? 'cursor-pointer' : ''}
    >
      <BaseCard
        title={inventory.name}
        description={undefined} 
        actions={
          !isSelectable ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRename?.(inventory);
                }}
                className="text-blue-600 hover:underline"
              >
                Rename
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(inventory);
                }}
                className="text-red-500 hover:underline ml-4"
              >
                Delete
              </button>
            </>
          ) : undefined
        }
      />
    </div>
  );
};

export default InventoryCard;
