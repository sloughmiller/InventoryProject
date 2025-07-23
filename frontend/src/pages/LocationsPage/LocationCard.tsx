import React from 'react';
import BaseCard from '../../components/cards/BaseCard';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Location } from '../../types';

interface LocationCardProps {
  location: Location;
  onEdit: () => void;
  onDelete: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onEdit, onDelete }) => {
  return (
    <BaseCard
      title={location.name}
      description={location.description || 'No description'}
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

export default LocationCard;
