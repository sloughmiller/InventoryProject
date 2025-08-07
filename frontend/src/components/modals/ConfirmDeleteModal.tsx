// src/components/modals/ConfirmDeleteModal.tsx
import React from 'react';
import ModalWrapper from './ModalWrapper';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} title={title} onClose={onClose}>
      <p className="text-gray-700">{message}</p>

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmDeleteModal;
