// src/components/modals/EditInventoryModal.tsx
import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import type { Inventory } from '../../types';

interface Props {
  isOpen: boolean;
  inventory: Inventory;
  onClose: () => void;
  onSave: (newName: string) => void;
}

const EditInventoryModal: React.FC<Props> = ({ isOpen, inventory, onClose, onSave }) => {
  const [newName, setNewName] = useState(inventory.name);

  useEffect(() => {
    if (isOpen) {
      setNewName(inventory.name);
    }
  }, [isOpen, inventory.name]);

  const handleSave = () => {
    if (newName.trim()) {
      onSave(newName.trim());
    }
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} title="Edit Inventory" onClose={onClose}>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Enter new name"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditInventoryModal;
