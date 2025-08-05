// src/hooks/useInventoryList.ts
import { useEffect, useState } from 'react';
import api from '../api/api';
import { type Inventory } from '../types';

export function useInventoryList() {
  const [inventoryOptions, setInventoryOptions] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/inventories/accessible');
        setInventoryOptions(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch inventory options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { inventoryOptions, loading };
}
