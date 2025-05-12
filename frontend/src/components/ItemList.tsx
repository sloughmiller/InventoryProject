import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
  category_id: number;
  location_id: number;
}

interface ItemListProps {
  refreshFlag: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ refreshFlag }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items/');
      setItems(response.data);
    } catch (err) {
      console.error('❌ Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshFlag]);

  if (loading) return <p>Loading items...</p>;

  return (
    <div>
      <h3>📦 Inventory Items</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.description} (Qty: {item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
