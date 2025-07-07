// src/pages/InventorySelectorPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import type { Inventory } from '../types';

const InventorySelectorPage: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const res = await api.get('/inventories/accessible');
        const data: Inventory[] = res.data;
        setInventories(data);

        if (data.length === 1) {
          // Auto-select and go to dashboard
          localStorage.setItem('selectedInventory', JSON.stringify(data[0]));
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('❌ Failed to fetch inventories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventories();
  }, [navigate]);

  const handleSelect = (inv: Inventory) => {
    localStorage.setItem('selectedInventory', JSON.stringify(inv));
    navigate('/dashboard');
  };

  if (loading) return <p className="p-4 text-gray-600">Loading inventories...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">Select an Inventory</h2>
      <ul className="space-y-3">
        {inventories.map((inv) => (
          <li
            key={inv.id}
            className="p-3 bg-gray-100 hover:bg-emerald-100 rounded cursor-pointer border"
            onClick={() => handleSelect(inv)}
          >
            {inv.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventorySelectorPage;
