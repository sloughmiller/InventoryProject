// src/api/itemApi.ts
import api from './api';
import type { Item } from '../types'



export async function getItems(inventoryId: string): Promise<Item[]> {
  const res = await api.get('/items/', {
    params: inventoryId ? { inventory_id: inventoryId } : {},
  });
  return res.data;
}

export async function getItem(id: string): Promise<Item> {
  const res = await api.get(`/items/${id}`);
  return res.data;
}

export async function createItem(data: Omit<Item, 'id'>): Promise<Item> {
  const res = await api.post('/items/', data);
  return res.data;
}

export async function updateItem(id: string, data: Partial<Item>): Promise<Item> {
  const res = await api.put(`/items/${id}`, data);
  return res.data;
}

export async function deleteItem(id: string): Promise<Item> {
  const res = await api.delete(`/items/${id}`);
  return res.data;
}