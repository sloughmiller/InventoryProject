import api from './api';

// Match the backend model structure
export interface Item {
  id: number;
  name: string;
  description?: string;
  barcode?: string;
  purchase_date?: string; // ISO string
  location_id?: number;
  category_id?: number;
  condition_id?: number;
  inventory_id: number;
}

export interface CreateItemInput {
  name: string;
  description?: string;
  barcode?: string;
  purchase_date?: string;
  location_id?: number;
  category_id?: number;
  condition_id?: number;
}

// ✅ GET all items for an inventory
export async function getItems(inventory_id: number): Promise<Item[]> {
  const res = await api.get('/items/', {
    params: { inventory_id },
  });
  return res.data;
}

// ✅ GET single item by ID
export async function getItem(id: number): Promise<Item> {
  const res = await api.get(`/items/${id}`);
  return res.data;
}

// ✅ POST a new item
export async function createItem(
  data: CreateItemInput,
  inventory_id: number
): Promise<Item> {
  const res = await api.post('/items/', data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

// ✅ PUT (update) existing item
export async function updateItem(
  id: number,
  data: Partial<CreateItemInput>,
  inventory_id: number
): Promise<Item> {
  const res = await api.put(`/items/${id}`, data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

// ✅ DELETE an item
export async function deleteItem(
  id: number,
  inventory_id: number
): Promise<Item> {
  const res = await api.delete(`/items/${id}`, {
    params: { inventory_id },
  });
  return res.data;
}
