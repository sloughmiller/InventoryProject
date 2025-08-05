import React from 'react';
import BaseCard from '../../components/cards/BaseCard';
import type { Location } from '../../types';

interface LocationCardProps {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onEdit, onDelete }) => {
  return (
    <BaseCard
      title={location.name}
      description={location.description || ''}
      actions={
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => onEdit(location)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            aria-label="Edit location"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(location)}
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
            aria-label="Delete location"
          >
            🗑️ Delete
          </button>
        </div>
      }
    />
  );
};

export default LocationCard;
