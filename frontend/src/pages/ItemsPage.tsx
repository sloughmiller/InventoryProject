import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/itemApi'
import ItemForm from '../components/ItemForm';
import Layout from '../components/Layout';
import ItemCard from '../components/cards/ItemCard';
import api from '../api/api';
import type { Item, Inventory } from '../types';


const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [locationMap, setLocationMap] = useState<Record<number, string>>({});
  const [inventories, setInventories] = useState<Inventory[]>([]);



  const fetchItems = async () => {
    try {
      const [itemsData, categoriesData, locationsData, inventoriesData] = await Promise.all([
        getItems(),
        api.get('/categories/'),
        api.get('/locations/'),
        api.get('/inventories/accessible'),
      ]);

      const catMap: Record<number, string> = {};
      categoriesData.data.forEach((cat: { id: number; name: string }) => {
        catMap[cat.id] = cat.name;
      });

      const locMap: Record<number, string> = {};
      locationsData.data.forEach((loc: { id: number; name: string }) => {
        locMap[loc.id] = loc.name;
      });

      setItems(itemsData);
      setCategoryMap(catMap);
      setLocationMap(locMap);
      setInventories(inventoriesData.data);  // 👈 Add this line
      setError('');
    } catch (err) {
      console.error('❌ Failed to fetch items or related data:', err);
      setError('Failed to load items.');
    }
  };



  const handleDelete = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(itemId);

      fetchItems();
    } catch (err) {
      console.error('❌ Failed to delete item:', err);
      setError('Failed to delete item.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
              onEditDone={() => setEditingItem(null)}
              inventories={inventories}
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
                  onEdit={() => setEditingItem(item)}
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
