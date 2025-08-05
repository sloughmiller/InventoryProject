import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  title: string;
  currentValue: string;
  currentDescription?: string;
  onClose: () => void;
  onSave: (newName: string, newDescription?: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  title,
  currentValue,
  currentDescription = '',
  onClose,
  onSave,
}) => {
  const [newName, setNewName] = useState(currentValue);
  const [newDescription, setNewDescription] = useState(currentDescription);

  useEffect(() => {
    if (isOpen) {
      setNewName(currentValue);
      setNewDescription(currentDescription);
    }
  }, [isOpen, currentValue, currentDescription]);

  const handleSave = () => {
    if (newName.trim()) {
      onSave(newName.trim(), newDescription.trim());

    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-emerald-700">{title}</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter new name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
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
    </div>
  );
};

export default EditModal;
