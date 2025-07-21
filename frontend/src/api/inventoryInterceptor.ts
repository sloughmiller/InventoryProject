// src/api/inventoryInterceptor.ts
import api from './api';

api.interceptors.request.use((config) => {
  const selectedInventoryId = localStorage.getItem('selectedInventoryId');

  if (selectedInventoryId) {
    // Inject into query params (for GET/DELETE)
    if (!config.params) config.params = {};
    config.params.inventory_id = selectedInventoryId;

    // Optional: if you ever want to support pulling from headers instead
    // config.headers = {
    //   ...config.headers,
    //   'X-Inventory-ID': selectedInventoryId,
    // };
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
