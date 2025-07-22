import React from 'react';
import BaseCard from '../../components/cards/BaseCard';
import type { Category } from '../../types';

type Props = {
  category: Category;
  onRename: (category: Category) => void;
  onDelete: (category: Category) => void;
};

const CategoryCard: React.FC<Props> = ({ category, onRename, onDelete }) => (
  <BaseCard
    title={category.name}
    description={`ID: ${category.id}`}
    actions={
      <>
        <button onClick={() => onRename(category)} className="text-blue-600 hover:underline">Edit</button>
        <button onClick={() => onDelete(category)} className="text-red-500 hover:underline">Delete</button>
      </>
    }
  />
);

export default CategoryCard;
