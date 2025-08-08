// src/pages/InventoryManagerPage.tsx
import React, { useEffect, useState } from 'react';
import {
  getInventories,
  renameInventory,
  deleteInventory,
} from '../../api/inventoryApi';
import EditInventoryModal from '../../components/modals/EditInventoryModal';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import Layout from '../../components/layout';
import InventoryForm from '../../components/inventories/InventoryForm';
import InventoryCard from '../../components/inventories/InventoryCard';
import { log } from '../../utils/logger';
import type { Inventory } from '../../types';
import toast from 'react-hot-toast';

const InventoryManagerPage: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [editingInventory, setEditingInventory] = useState<Inventory | null>(null);
  const [deletingInventory, setDeletingInventory] = useState<Inventory | null>(null);



  const fetchInventories = async () => {
    try {
      const data = await getInventories();
      setInventories(data);
      log.info('InventoryManagerPage', '📦 Inventories loaded:', data);
    } catch (err) {
      log.error('InventoryManagerPage', '❌ Failed to load inventories:', err);
      toast.error('Failed to load inventories.');
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const handleRename = (inv: Inventory) => {
    setEditingInventory(inv);
  };

  const handleSaveRename = async (newName: string) => {
    if (!editingInventory || newName === editingInventory.name) return;

    try {
      log.info('InventoryManagerPage', `✏️ Renaming inventory ${editingInventory.id} to "${newName}"`);
      await renameInventory(editingInventory.id, newName);
      toast.success('✏️ Inventory "${name}" renamed');
      setEditingInventory(null);
      fetchInventories();
    } catch (err) {
      log.error('InventoryManagerPage', `❌ Failed to rename inventory:`, err);
      toast.error('Failed to rename inventory.');
    }
  };


  const handleDelete = (inv: Inventory) => {
    setDeletingInventory(inv);
  };

  const confirmDelete = async () => {
    if (!deletingInventory) return;
    try {
      log.info('InventoryManagerPage', `🗑️ Deleting inventory ${deletingInventory.id}`);
      await deleteInventory(deletingInventory.id);
      toast.success('🗑️ Inventory "${name}" deleted');
      setDeletingInventory(null);
      fetchInventories();
    } catch (err) {
      log.error('InventoryManagerPage', `❌ Failed to delete inventory:`, err);
      toast.error('Failed to delete inventory.');
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
        {editingInventory && (
          <EditInventoryModal
            isOpen={!!editingInventory}
            inventory={editingInventory}
            onClose={() => setEditingInventory(null)}
            onSave={handleSaveRename}
          />
        )}
        {deletingInventory && (
          <ConfirmDeleteModal
            isOpen={!!deletingInventory}
            title="Delete Inventory"
            message={`Are you sure you want to delete "${deletingInventory.name}"? This action cannot be undone.`}
            onClose={() => setDeletingInventory(null)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </Layout>
  );
};

export default InventoryManagerPage;
