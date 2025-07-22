// src/components/cards/InventoryCard.tsx
import React from 'react';
import BaseCard from '../../components/cards/BaseCard';
import type { Inventory } from '../../types';

type Props = {
  inventory: Inventory;
  onRename?: (inventory: Inventory) => void;
  onDelete?: (inventory: Inventory) => void;
  onSelect?: (inventory: Inventory) => void;
};

const InventoryCard: React.FC<Props> = ({ inventory, onRename, onDelete, onSelect }) => {
  const handleClick = () => {
    if (onSelect) onSelect(inventory);
  };

  return (
    <div onClick={handleClick} className={onSelect ? 'cursor-pointer' : ''}>
      <BaseCard
        title={inventory.name}
        description={`ID: ${inventory.id}`}
        actions={
          !onSelect && (
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
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </>
          )
        }
      />
    </div>
  );
};

export default InventoryCard;
