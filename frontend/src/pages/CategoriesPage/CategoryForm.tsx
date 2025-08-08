import React, { useState } from 'react';
import BaseCard from '../../components/cards/BaseCard';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import { createCategory } from '../../api/categoryApi';
import { useWithLoading } from '../../utils/withLoading'; 
import toast from 'react-hot-toast';
interface CategoryFormProps {
  onCreated: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { selectedInventory, loading } = useSelectedInventory();

  const doWithLoading = useWithLoading(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInventory || loading) {
      setError('Inventory not selected. Please select or reload.');
      return;
    }

    try {
      await doWithLoading(() =>
        createCategory({ name }, selectedInventory.id)
      );
      setName('');
      setError('');
      onCreated();
      toast.success(`✅ Category "${name}" added`);
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
