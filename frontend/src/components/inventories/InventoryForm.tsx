// src/components/InventoryForm.tsx
import React, { useState } from 'react';
import { createInventory } from '../../api/inventoryApi';
import BaseCard from '../cards/BaseCard';
import { log } from '../../utils/logger';
import toast from 'react-hot-toast';

interface Props {
  onCreated: () => void;
}

const InventoryForm: React.FC<Props> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      log.info('InventoryForm', `➕ Creating inventory: ${name}`);
      await createInventory(name);
      setName('');
      setError('');
      toast.success('➕ Inventory created');
      onCreated();
    } catch (err) {
      log.error('InventoryForm', '❌ Failed to create inventory:', err);
      setError('Could not create inventory.');
    }
  };

  return (
    <BaseCard title="➕ Add Inventory" description="Create a new inventory list.">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Inventory name"
          required
        />
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </BaseCard>
  );
};

export default InventoryForm;
