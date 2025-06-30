import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ItemForm from '../components/ItemForm';
import Layout from '../components/Layout';

interface Item {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  category_id: number;
  location_id: number;
}

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const res = await api.get('/items/');
      setItems(res.data);
      setError('');
    } catch (err) {
      console.error('❌ Failed to fetch items:', err);
      setError('Failed to load items.');
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
            ➕ Add New Item
          </h3>
          <div className="bg-white p-6 rounded shadow">
            <ItemForm onItemCreated={fetchItems} />
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
                <div
                  key={item.id}
                  className="bg-white shadow border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-gray-600 italic mb-2">
                    {item.description || 'No description'}
                  </p>
                  <p className="text-sm text-gray-700">
                    Quantity: <span className="font-semibold">{item.quantity}</span>
                  </p>
                  <button
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    onClick={() => alert(`Edit item ${item.name}`)}
                  >
                    ✏️ Edit Item
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default ItemsPage;
