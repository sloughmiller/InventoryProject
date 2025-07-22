// src/api/inventoryInterceptor.ts
import api from './api';

api.interceptors.request.use((config) => {
  const selectedInventoryId = localStorage.getItem('selectedInventoryId');

  if (selectedInventoryId) {
    const method = config.method?.toLowerCase();

    // Only inject for GET or DELETE
    if (method === 'get' || method === 'delete') {
      if (!config.params) config.params = {};
      config.params.inventory_id = selectedInventoryId;
    }
  }

  return config;
});

