import api from './api';
import type { Inventory } from '../types';

export async function getInventories(): Promise<Inventory[]> {
  const res = await api.get('/inventories/');
  return res.data;
}

export async function getAccessibleInventories(): Promise<Inventory[]> {
  const res = await api.get('/inventories/accessible');
  return res.data;
}

export async function createInventory(name: string): Promise<void> {
  await api.post('/inventories/', { name });
}

export async function renameInventory(id: string, name: string): Promise<void> {
  await api.put(`/inventories/${id}`, { name });
}

export async function deleteInventory(id: string): Promise<void> {
  await api.delete(`/inventories/${id}`);
}
