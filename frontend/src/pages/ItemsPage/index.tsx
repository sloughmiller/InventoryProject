// src/pages/items/ItemsPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryList } from '../../hooks/useInventoryList';
import { getItems, deleteItem } from '../../api/itemApi';
import Layout from '../../components/layout';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import ModalWrapper from '../../components/modals/ModalWrapper';
import api from '../../api/api';
import { log } from '../../utils/logger';
import type { Item } from '../../types';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import Spinner from '../../components/Spinner';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';


const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [locationMap, setLocationMap] = useState<Record<string, string>>({});
  const { selectedInventory } = useSelectedInventory();
  const navigate = useNavigate();
  const { inventoryOptions, loading } = useInventoryList();
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);




  const fetchItems = async () => {
    log.info('ItemsPage', '🔄 Fetching items and metadata...');
    setLoadingItems(true);

    try {
      const [itemsData, categoriesData, locationsData] = await Promise.all([
        getItems(selectedInventory?.id ?? ''),
        api.get('/categories/'),
        api.get('/locations/'),
      ]);

      const catMap: Record<string, string> = {};
      categoriesData.data.forEach((cat: { id: string; name: string }) => {
        catMap[cat.id] = cat.name;
      });

      const locMap: Record<string, string> = {};
      locationsData.data.forEach((loc: { id: string; name: string }) => {
        locMap[loc.id] = loc.name;
      });

      const filteredItems = selectedInventory
        ? itemsData.filter((item) => item.inventory_id === selectedInventory.id)
        : [];

      setItems(filteredItems);
      setCategoryMap(catMap);
      setLocationMap(locMap);
      setError('');
      log.info('ItemsPage', `✅ Loaded ${filteredItems.length} items`);
    } catch (err) {
      log.error('ItemsPage', '❌ Failed to fetch items or metadata', err);
      setError('Failed to load items.');
    } finally {
      setLoadingItems(false);
    }
  };


  const confirmDelete = async () => {
  if (!deletingItem) return;

  const deletedName = deletingItem.name;

  try {
    await deleteItem(deletingItem.id);
    toast.success(`🗑️ Item "${deletedName}" deleted`);
    fetchItems();
  } catch (err) {
    toast.error('❌ Failed to delete item');
    log.error('ItemsPage', '❌ Deletion failed:', err);
  } finally {
    setDeletingItem(null);
  }
};



  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setTimeout(() => setShowItemModal(true), 0);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setTimeout(() => setShowItemModal(true), 0);
  };

 
  useEffect(() => {
    if (!loading && !selectedInventory) {
      if (inventoryOptions.length > 0) {
        log.warn('ItemsPage', '🚨 No selected inventory — redirecting to selector');
        navigate('/inventory-selector');
      } else {
        log.warn('ItemsPage', '🆘 No inventories exist — redirecting to manage');
        navigate('/inventories', {
          state: { message: 'Please create an inventory before adding items.' },
        });
      }
    }
  }, [selectedInventory, loading, inventoryOptions, navigate]);

  
  useEffect(() => {
    if (selectedInventory) {
      log.debug('ItemsPage', '🔁 Selected inventory changed to:', selectedInventory.name);
      fetchItems();
    }
  }, [selectedInventory]);


  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <header>
          <h2 className="text-3xl font-bold text-emerald-700 flex items-center gap-2">
            📦 Inventory Items
          </h2>
          <p className="text-gray-600 mt-2">Manage and review your current inventory.</p>
          <button
            onClick={handleAdd}
            className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            ➕ Add Item
          </button>
        </header>

        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </p>
        )}

        <section>
          <h3 className="text-2xl font-semibold text-emerald-600 mb-4 flex items-center gap-2">
            📂 Current Items
          </h3>

          {loadingItems ? (
            <Spinner />
          ) : items.length === 0 ? (
            <p className="text-gray-500">No items found. Add your first item above.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  categoryName={categoryMap[item.category_id]}
                  locationName={locationMap[item.location_id]}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => setDeletingItem(item)}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      <ModalWrapper
        isOpen={showItemModal}
        title={editingItem ? 'Edit Item' : 'Add Item'}
        onClose={() => {
          setShowItemModal(false);
          setEditingItem(null);
        }}
      >
        <ItemForm
          key={editingItem?.id || 'new'}
          editingItem={editingItem}
          onEditDone={(updated) => {
             toast.success(`✏️ Item "${updated.name}" updated`);
            setShowItemModal(false);
            setEditingItem(null);
            fetchItems();
          }}
          onItemCreated={(created) => {
            toast.success(`✅ Item "${created.name}" added`)
            setShowItemModal(false);
            fetchItems();
          }}
        />




      </ModalWrapper>

      {deletingItem && (
        <ConfirmDeleteModal
          isOpen={!!deletingItem}
          title="Delete Item"
          message={`Are you sure you want to delete "${deletingItem.name}"? This cannot be undone.`}
          onClose={() => setDeletingItem(null)}
          onConfirm={confirmDelete}
        />
      )}

    </Layout>
  );
};

export default ItemsPage;
