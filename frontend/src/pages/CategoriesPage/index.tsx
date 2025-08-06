import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import CategoryForm from './CategoryForm';
import CategoryCard from './CategoryCard';
import EditModal from '../../components/modals/EditModal'; // ✅ Import modal
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import {
  getCategoriesForInventory,
  renameCategory,
  deleteCategory,
  type Category,
} from '../../api/categoryApi';
import { useInventoryFetcher } from '../../hooks/useInventoryFetcher';
import { log } from '../../utils/logger';

const CategoriesPage: React.FC = () => {
  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();

  const {
    data: categories,
    error: fetchError,
    refetch,
  } = useInventoryFetcher<Category>(getCategoriesForInventory);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleRename = async (
    category: Category,
    newName: string,
    newDescription?: string
  ) => {
    if (!newName || !selectedInventory) return;

    const nameChanged = newName !== category.name;
    const descriptionChanged = newDescription !== category.description;

    if (!nameChanged && !descriptionChanged) return;

    try {
      log.info('CategoriesPage', `✏️ Renaming category ID ${category.id} to "${newName}"`);
      await renameCategory(
        category.id,
        newName,
        selectedInventory.id,
        newDescription
      );

      refetch();
    } catch (err) {
      log.error('CategoriesPage', `❌ Failed to rename category ID ${category.id}:`, err);
    } finally {
      setEditingCategory(null);
    }
  };


  const handleDelete = async (category: Category) => {
    const confirmDelete = confirm(`Delete category "${category.name}"?`);
    if (!confirmDelete || !selectedInventory) return;

    try {
      log.info('CategoriesPage', `🗑️ Deleting category ID ${category.id}`);
      await deleteCategory(category.id, selectedInventory.id);
      refetch();
    } catch (err) {
      log.error('CategoriesPage', `❌ Failed to delete category ID ${category.id}:`, err);
    }
  };

  useEffect(() => {
    if (selectedInventory && !inventoryLoading) {
      log.debug('CategoriesPage', '🔄 Triggering category refetch...');
      refetch();
    }
  }, [selectedInventory?.id, inventoryLoading]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">📁 Categories</h1>
          <p className="text-gray-500">Add and manage your item categories.</p>
        </header>

        <CategoryForm onCreated={refetch} />

        {fetchError && (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded text-center">{fetchError}</p>
        )}

        <div className="space-y-2">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onRename={() => setEditingCategory(cat)} // ✅ Open modal
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* ✅ Edit modal */}
      {editingCategory && (
        <EditModal
          isOpen={!!editingCategory}
          title="Edit Category"
          currentValue={editingCategory.name}
          currentDescription={editingCategory.description}
          onClose={() => setEditingCategory(null)}
          onSave={(newName, newDescription) =>
            handleRename(editingCategory, newName, newDescription)
          }
        />

      )}
    </Layout>
  );
};

export default CategoriesPage;
