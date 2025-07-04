// src/api/itemApi.ts
import api from './api';

export interface Item {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  category_id: number;
  location_id: number;
}

// ✅ GET all items
export async function getItems(): Promise<Item[]> {
  const res = await api.get('/items/');
  return res.data;
}

// ✅ GET single item by ID (optional, not required unless editing inline)
export async function getItem(id: number): Promise<Item> {
  const res = await api.get(`/items/${id}`);
  return res.data;
}

// ✅ POST a new item
export async function createItem(data: Omit<Item, 'id'>): Promise<Item> {
  const res = await api.post('/items/', data);
  return res.data;
}

// ✅ PUT (update) an existing item
export async function updateItem(id: number, data: Partial<Item>): Promise<Item> {
  const res = await api.put(`/items/${id}`, data);
  return res.data;
}

// ✅ DELETE an item
export async function deleteItem(id: number): Promise<Item> {
  const res = await api.delete(`/items/${id}`);
  return res.data;
}
