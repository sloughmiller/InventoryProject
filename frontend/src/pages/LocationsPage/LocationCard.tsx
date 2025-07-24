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
      description={`ID: ${location.id}`}
      actions={
        <>
          <button onClick={() => onEdit(location)} className="text-blue-600 hover:underline">Edit</button>
          <button onClick={() => onDelete(location)} className="text-red-500 hover:underline">Delete</button>
        </>
      }
    />

  );
};

export default LocationCard;
