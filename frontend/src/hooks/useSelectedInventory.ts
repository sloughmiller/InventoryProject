import { useContext } from 'react';
import { SelectedInventoryContext } from '../contexts/SelectedInventoryContext';

export const useSelectedInventory = () => {
  const ctx = useContext(SelectedInventoryContext);
  if (!ctx) {
    throw new Error('useSelectedInventory must be used within SelectedInventoryProvider');
  }
  return ctx;
};
