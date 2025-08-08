import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import CategoryForm from './CategoryForm';
import CategoryCard from './CategoryCard';
import EditModal from '../../components/modals/EditModal';
import Spinner from '../../components/Spinner';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import {
  getCategoriesForInventory,
  renameCategory,
  deleteCategory,
  type Category,
} from '../../api/categoryApi';
import { useInventoryFetcher } from '../../hooks/useInventoryFetcher';
import { log } from '../../utils/logger';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';

const CategoriesPage: React.FC = () => {
  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);



  const {
    data: categories,
    error: fetchError,
    loading: loadingCategories,
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
      toast.error('⚠️ Failed to update category');
    } finally {
      setEditingCategory(null);
    }
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const confirmDelete = async () => {
    if (!deletingCategory || !selectedInventory) return;

    try {
      await deleteCategory(deletingCategory.id, selectedInventory.id);
      toast.success('🗑️ Category "${name}" deleted');
      refetch();
    } catch (err) {
      toast.error('❌ Failed to delete category');
      log.error('CategoriesPage', err);
    } finally {
      setDeletingCategory(null);
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
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded text-center">
            {fetchError}
          </p>
        )}

        <div className="space-y-2">
          {loadingCategories ? (
            <Spinner />
          ) : categories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onRename={() => setEditingCategory(cat)}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {editingCategory && (
        <EditModal
          isOpen={!!editingCategory}
          title="Edit Category"
          currentValue={editingCategory.name}
          currentDescription={editingCategory.description}
          onClose={() => setEditingCategory(null)}
          onSave={async (newName, newDescription) => {
            await handleRename(editingCategory, newName, newDescription);
            toast.success('✏️ Category "${name}" updated');
          }}
        />
      )}
      {deletingCategory && (
        <ConfirmDeleteModal
          isOpen={!!deletingCategory}
          title="Delete Category"
          message={`Are you sure you want to delete "${deletingCategory.name}"?`}
          onClose={() => setDeletingCategory(null)}
          onConfirm={confirmDelete}
        />
      )}


    </Layout>
  );
};

export default CategoriesPage;
