// src/components/CategoryForm.tsx
import React, { useState } from 'react';
import api from '../../api/api';
import BaseCard from '../../components/cards/BaseCard';
import type { Category } from '../../types';
import { useSelectedInventory } from '../../contexts/SelectedInventoryContext';

interface CategoryFormProps {
  onCreated: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { selectedInventory, loading } = useSelectedInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInventory || loading) {
      setError('Inventory not selected. Please select or reload.');
      return;
    }

    try {
      await api.post<Category>('/categories/', {
        name,
        inventory_id: selectedInventory.id,
      });

      setName('');
      setError('');
      onCreated();
    } catch (err) {
      console.error('❌ Failed to create category:', err);
      setError('Could not create category.');
    }
  };

  return (
    <BaseCard title="➕ Add New Category" description="Enter a name and click to add.">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium"
        >
          ➕ Add Category
        </button>
      </form>
    </BaseCard>
  );
};

export default CategoryForm;
