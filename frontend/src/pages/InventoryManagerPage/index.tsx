// src/pages/InventoryManagerPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Layout from '../../components/layout';
import InventoryForm from '../../components/inventories/InventoryForm';
import InventoryCard from '../../components/inventories/InventoryCard';
import { log } from '../../utils/logger';
import type { Inventory } from '../../types';

const InventoryManagerPage: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  const fetchInventories = async () => {
    try {
      const res = await api.get('/inventories/');
      setInventories(res.data);
      log.info('InventoryManagerPage', '📦 Inventories loaded:', res.data);
    } catch (err) {
      log.error('InventoryManagerPage', '❌ Failed to load inventories:', err);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const handleRename = async (inv: Inventory) => {
    const newName = prompt('Enter new name for this inventory:', inv.name);
    if (!newName || newName === inv.name) return;
    try {
      log.info('InventoryManagerPage', `✏️ Renaming inventory ${inv.id} to "${newName}"`);
      await api.put(`/inventories/${inv.id}`, { name: newName });
      fetchInventories();
    } catch (err) {
      log.error('InventoryManagerPage', `❌ Failed to rename inventory ${inv.id}:`, err);
    }
  };

  const handleDelete = async (inv: Inventory) => {
    if (!confirm(`Delete inventory "${inv.name}"?`)) return;
    try {
      log.info('InventoryManagerPage', `🗑️ Deleting inventory ${inv.id}`);
      await api.delete(`/inventories/${inv.id}`);
      fetchInventories();
    } catch (err) {
      log.error('InventoryManagerPage', `❌ Failed to delete inventory ${inv.id}:`, err);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">📂 Inventories</h1>
          <p className="text-gray-500">Manage your inventory collections here.</p>
        </header>

        <InventoryForm onCreated={fetchInventories} />

        <div className="space-y-3">
          {inventories.length === 0 ? (
            <p className="text-gray-500 text-center">No inventories yet.</p>
          ) : (
            inventories.map((inv) => (
              <InventoryCard
                key={inv.id}
                inventory={inv}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InventoryManagerPage;
