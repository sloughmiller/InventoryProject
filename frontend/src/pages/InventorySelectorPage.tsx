// src/pages/InventorySelectorPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import type { Inventory } from '../types';
import Layout from '../components/Layout';

const InventorySelectorPage: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await api.get('/inventories/accessible');
        setInventories(response.data);
      } catch (err) {
        console.error('❌ Failed to fetch inventories:', err);
        setError('Failed to load inventories');
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  const handleSelect = (inventory: Inventory) => {
    localStorage.setItem('selectedInventoryId', inventory.id.toString());
    localStorage.setItem('selectedInventoryName', inventory.name);
    navigate('/items'); // or wherever your app should land after selection
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">Select an Inventory</h2>

        {loading ? (
          <p>Loading inventories...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : inventories.length === 0 ? (
          <p>No inventories found. Please create one first.</p>
        ) : (
          <ul className="space-y-3">
            {inventories.map((inv) => (
              <li key={inv.id}>
                <button
                  className="w-full text-left p-3 border rounded hover:bg-emerald-50"
                  onClick={() => handleSelect(inv)}
                >
                  <span className="text-lg font-semibold text-emerald-800">{inv.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default InventorySelectorPage;
