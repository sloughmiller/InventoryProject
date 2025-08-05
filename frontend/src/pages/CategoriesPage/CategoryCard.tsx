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
    description={category.description || ''} // fallback to empty string if null
    actions={
      <div className="flex gap-4 text-sm">
        <button
          onClick={() => onRename(category)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          aria-label="Edit category"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(category)}
          className="flex items-center gap-1 text-red-500 hover:text-red-700"
          aria-label="Delete category"
        >
          🗑️ Delete
        </button>
      </div>
    }
  />
);

export default CategoryCard;
