import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ItemForm from '../components/ItemForm';

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">📦 Inventory Items</h2>

      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </p>
      )}

      <div className="mb-8">
        <ItemForm onItemCreated={fetchItems} />
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">🗂️ Current Items</h3>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow-md rounded p-4 border border-gray-200"
            >
              <div className="text-xl font-medium text-gray-800">{item.name}</div>
              <div className="text-gray-600 italic">
                {item.description || 'No description'}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                Quantity: <span className="font-semibold">{item.quantity}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemsPage;
