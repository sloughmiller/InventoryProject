import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../../api/itemApi';
import ItemForm from './ItemForm';
import Layout from '../../components/layout';
import ItemCard from './ItemCard';
import api from '../../api/api';
import { log } from '../../utils/logger';
import type { Item, Inventory } from '../../types';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [locationMap, setLocationMap] = useState<Record<string, string>>({});
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const { selectedInventory } = useSelectedInventory();

  const fetchItems = async () => {
    log.info('ItemsPage', '🔄 Fetching items and metadata...');
    try {
      const [itemsData, categoriesData, locationsData, inventoriesData] = await Promise.all([
        getItems(selectedInventoryId),
        api.get('/categories/'),
        api.get('/locations/'),
        api.get('/inventories/accessible'),
      ]);

      const catMap: Record<string, string> = {};
      categoriesData.data.forEach((cat: { id: string; name: string }) => {
        catMap[cat.id] = cat.name;
      });

      const locMap: Record<string, string> = {};
      locationsData.data.forEach((loc: { id: string; name: string }) => {
        locMap[loc.id] = loc.name;
      });

      const filteredItems =
  selectedInventoryId === ''
    ? itemsData
    : itemsData.filter((item) => item.inventory_id === selectedInventoryId);


      setItems(filteredItems);
      setCategoryMap(catMap);
      setLocationMap(locMap);
      setInventories(inventoriesData.data);
      setError('');

      log.info('ItemsPage', `✅ Loaded ${filteredItems.length} items`);
    } catch (err) {
      log.error('ItemsPage', '❌ Failed to fetch items or metadata', err);
      setError('Failed to load items.');
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    log.warn('ItemsPage', '🗑️ Deleting item ID', itemId);
    try {
      await deleteItem(itemId);
      log.info('ItemsPage', '✅ Item ID deleted', itemId);
      fetchItems();
    } catch (err) {
      log.error('ItemsPage', '❌ Failed to delete item ID', itemId, err);
      setError('Failed to delete item.');
    }
  };

  useEffect(() => {
    log.debug('ItemsPage', '🔁 Selected inventory changed to:', selectedInventoryId || 'All');
    fetchItems();
  }, [selectedInventoryId]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <header>
          <h2 className="text-3xl font-bold text-emerald-700 flex items-center gap-2">
            📦 Inventory Items
          </h2>
          <p className="text-gray-600 mt-2">
            Manage and review your current inventory.
          </p>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 mr-2">Filter by Inventory:</label>
            <select
              value={selectedInventoryId}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedInventoryId(value);
                log.debug('ItemsPage', '🧭 Inventory filter selected:', value || 'All');
              }}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">All Inventories</option>
              {inventories.map((inv) => (
                <option key={inv.id} value={inv.id}>

                  {inv.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </p>
        )}

        <section>
          <h3 className="text-2xl font-semibold text-emerald-600 mb-4 flex items-center gap-2">
            {editingItem ? '✏️ Edit Item' : '➕ Add New Item'}
          </h3>
          <div className="bg-white p-6 rounded shadow">
            <ItemForm
              onItemCreated={fetchItems}
              editingItem={editingItem}
              onEditDone={() => {
                log.debug('ItemsPage', '✅ Finished editing item');
                setEditingItem(null);
              }}
            />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-emerald-600 mb-4 flex items-center gap-2">
            📂 Current Items
          </h3>

          {items.length === 0 ? (
            <p className="text-gray-500">No items found. Add your first item above.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  categoryName={categoryMap[item.category_id]}
                  locationName={locationMap[item.location_id]}
                  onEdit={() => {
                    log.info('ItemsPage', '✏️ Editing item ID', item.id);
                    setEditingItem(item);
                  }}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default ItemsPage;
