// src/contexts/SelectedInventoryContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Inventory } from '../types';

interface InventoryContextType {
  selectedInventory: Inventory | null;
  setSelectedInventory: (inv: Inventory) => void;
}

const SelectedInventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const SelectedInventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedInventory, setSelectedInventoryState] = useState<Inventory | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('selectedInventoryId');
    const storedName = localStorage.getItem('selectedInventoryName');
    if (storedId && storedName) {
      setSelectedInventoryState({ id: parseInt(storedId), name: storedName });
    }
  }, []);

  const setSelectedInventory = (inv: Inventory) => {
    localStorage.setItem('selectedInventoryId', inv.id.toString());
    localStorage.setItem('selectedInventoryName', inv.name);
    setSelectedInventoryState(inv);
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
