import React from 'react';
import BaseCard from '../../components/cards/BaseCard';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Item } from '../../types';

interface ItemCardProps {
  item: Item;
  categoryName?: string;
  locationName?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  categoryName = 'Unknown',
  locationName = 'Unknown',
  onEdit,
  onDelete,
}) => {
  return (
    <BaseCard
      title={item.name}
      description={`Qty: ${item.quantity} | Category: ${categoryName} | Location: ${locationName}`}
      actions={
        <>
          <button
            onClick={onEdit}
            title="Edit"
            className="text-blue-600 hover:text-blue-800"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="text-red-600 hover:text-red-800"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </>
      }
    />
  );
};

export default ItemCard;
