// src/api/inventoryInterceptor.ts
import api from './api';

api.interceptors.request.use((config) => {
  const selectedInventoryId = localStorage.getItem('selectedInventoryId');
  const method = config.method?.toLowerCase();

  
  if (selectedInventoryId && (method === 'get' || method === 'delete')) {
    if (!config.params) config.params = {};
    config.params.inventory_id = selectedInventoryId;
    console.log('🔗 Injecting inventory_id into query params:', selectedInventoryId);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
