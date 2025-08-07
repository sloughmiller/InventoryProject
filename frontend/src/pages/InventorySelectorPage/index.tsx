// src/pages/InventorySelectorPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/layout';
import InventoryCard from '../../components/inventories/InventoryCard';
import { log } from '../../utils/logger';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import { getAccessibleInventories } from '../../api/inventoryApi';
import type { Inventory } from '../../types';

const InventorySelectorPage: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedInventory } = useSelectedInventory();

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await getAccessibleInventories();
        setInventories(data);
        log.info('InventorySelectorPage', '✅ Inventories fetched:', data);

        if (data.length === 1) {
          log.info('InventorySelectorPage', `🟢 Auto-selecting inventory "${data[0].name}"`);
          setSelectedInventory(data[0]);
          navigate('/dashboard');
        }
      } catch (err) {
        log.error('InventorySelectorPage', '❌ Failed to fetch inventories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, [navigate, setSelectedInventory]);

  const handleSelect = (inv: Inventory) => {
    log.info('InventorySelectorPage', `📦 Inventory selected: ${inv.name}`);
    setSelectedInventory(inv);
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">📦 Select an Inventory</h1>
          <p className="text-gray-500">Choose which inventory you want to view and manage.</p>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading inventories...</p>
        ) : inventories.length === 0 ? (
          <p className="text-center text-gray-500">No inventories found. Please contact admin.</p>
        ) : (
          <div className="space-y-4">
            {inventories.map((inv) => (
              <InventoryCard
                key={inv.id}
                inventory={inv}
                onSelect={() => handleSelect(inv)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InventorySelectorPage;
