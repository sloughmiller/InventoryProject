import { useEffect, useState, useCallback } from 'react';
import { useSelectedInventory } from '../hooks/useSelectedInventory';

import { log } from '../utils/logger';

type FetchFn<T> = (inventory_id: string) => Promise<T[]>;


export function useInventoryFetcher<T>(fetchFn: FetchFn<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();

  const fetchData = useCallback(async () => {
    if (!selectedInventory || inventoryLoading) {
      log.warn('useInventoryFetcher', '⏳ Waiting on selected inventory...');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      log.debug('useInventoryFetcher', `🔄 Fetching with inventory_id=${selectedInventory.id}`);
      const result = await fetchFn(selectedInventory.id);
      setData(result);
    } catch (err: unknown) {
      log.error('useInventoryFetcher', '❌ Error fetching data:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch data.');
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, selectedInventory, inventoryLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
