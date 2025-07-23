import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Layout from '../../components/layout';
import CategoryForm from './CategoryForm';
import CategoryCard from './CategoryCard';
import type { Category } from '../../types';
import { log } from '../../utils/logger';
import { useSelectedInventory } from '../../contexts/SelectedInventoryContext';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { selectedInventory, loading } = useSelectedInventory();

  const fetchCategories = async () => {
    if (!selectedInventory || loading) {
      log.warn('CategoriesPage', '⚠️ No inventory selected or still loading.');
      return;
    }

    try {
      const response = await api.get(`/categories/?inventory_id=${selectedInventory.id}`);
      setCategories(response.data);
      log.info('CategoriesPage', '📦 Categories loaded:', response.data);
    } catch (err) {
      log.error('CategoriesPage', '❌ Failed to load categories:', err);
    }
  };

  const handleRename = async (category: Category) => {
    const newName = prompt('Enter new category name:', category.name);
    if (!newName || newName === category.name) return;

    if (!selectedInventory) {
      log.warn('CategoriesPage', '⚠️ No inventory selected.');
      return;
    }

    try {
      log.info('CategoriesPage', `✏️ Renaming category ID ${category.id} to "${newName}"`);
      await api.put(`/categories/${category.id}?inventory_id=${selectedInventory.id}`, {
        name: newName,
      });
      fetchCategories();
    } catch (err) {
      log.error('CategoriesPage', `❌ Failed to rename category ID ${category.id}:`, err);
    }
  };

  const handleDelete = async (category: Category) => {
    const confirmDelete = confirm(`Delete category "${category.name}"?`);
    if (!confirmDelete) return;

    if (!selectedInventory) {
      log.warn('CategoriesPage', '⚠️ No inventory selected.');
      return;
    }

    try {
      log.info('CategoriesPage', `🗑️ Deleting category ID ${category.id}`);
      await api.delete(`/categories/${category.id}?inventory_id=${selectedInventory.id}`);
      fetchCategories();
    } catch (err) {
      log.error('CategoriesPage', `❌ Failed to delete category ID ${category.id}:`, err);
    }
  };



  useEffect(() => {
    if (selectedInventory && !loading) {
      log.debug('CategoriesPage', '🔄 Initializing category fetch...');
      fetchCategories();
    }
  }, [selectedInventory?.id, loading]);


  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">📁 Categories</h1>
          <p className="text-gray-500">Add and manage your item categories.</p>
        </header>

        <CategoryForm onCreated={fetchCategories} />

        <div className="space-y-2">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
