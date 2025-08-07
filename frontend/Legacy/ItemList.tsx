import React, { useEffect, useState } from 'react';
import api from '../src/api/api';
import { useSelectedInventory } from '../src/hooks/useSelectedInventory';
import type { Item } from '../src/types';


interface ItemListProps {
  refreshFlag: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ refreshFlag }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedInventory } = useSelectedInventory();

  useEffect(() => {
    if (!selectedInventory?.id) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await api.get('/items/', {
          params: { inventory_id: selectedInventory.id },
        });
        setItems(response.data);
      } catch (err) {
        console.error('❌ Failed to fetch items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [refreshFlag, selectedInventory?.id]);

  if (loading) return <p>Loading items...</p>;
  if (items.length === 0) return <p>No items found in this inventory.</p>;


  return (
    <div>
      <h3>📦 Inventory Items</h3>
      <ul className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <li key={item.id} className="border p-4 rounded shadow-sm bg-white">
            <h4 className="font-bold">{item.name}</h4>
            <p>{item.description || 'No description'}</p>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ItemList;
