// src/contexts/SelectedInventoryContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Inventory } from '../types';
import { log } from '../utils/logger'; // assuming you're using your centralized logger

interface InventoryContextType {
  selectedInventory: Inventory | null;
  setSelectedInventory: (inv: Inventory) => void;
}

const SelectedInventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const SelectedInventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedInventory, setSelectedInventoryState] = useState<Inventory | null>(null);

  useEffect(() => {
    try {
      const storedId = localStorage.getItem('selectedInventoryId');
      const storedName = localStorage.getItem('selectedInventoryName');

      if (storedId && storedName) {
        const restored: Inventory = {
          id: parseInt(storedId, 10),
          name: storedName,
        };

        setSelectedInventoryState(restored);
        log.info('SelectedInventoryContext', '📦 Restored inventory from localStorage:', restored);
      } else {
        log.debug('SelectedInventoryContext', 'ℹ️ No saved inventory found in localStorage.');
      }
    } catch (err) {
      log.warn('SelectedInventoryContext', '⚠️ Failed to restore inventory from localStorage:', err);
    }
  }, []);

  const setSelectedInventory = (inv: Inventory) => {
    try {
      localStorage.setItem('selectedInventoryId', inv.id.toString());
      localStorage.setItem('selectedInventoryName', inv.name);
      setSelectedInventoryState(inv);
      log.info('SelectedInventoryContext', '✅ Inventory selected and saved to localStorage:', inv);
    } catch (err) {
      log.error('SelectedInventoryContext', '❌ Failed to save inventory to localStorage:', err);
    }
  };

  return (
    <SelectedInventoryContext.Provider value={{ selectedInventory, setSelectedInventory }}>
      {children}
    </SelectedInventoryContext.Provider>
  );
};

export const useSelectedInventory = () => {
  const ctx = useContext(SelectedInventoryContext);
  if (!ctx) throw new Error('useSelectedInventory must be used within provider');
  return ctx;
};
