// src/pages/ItemsPage.tsx
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
    <div>
      <h2>Inventory Items</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ItemForm onItemCreated={fetchItems} />

      <h3>Current Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> – {item.description || 'No description'} (Qty: {item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
