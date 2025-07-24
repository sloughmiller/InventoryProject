import api from './api';

export interface Category {
  id: number;
  name: string;
  description?: string;
  inventory_id: number;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export async function getCategoriesForInventory(inventory_id: number): Promise<Category[]> {
  const res = await api.get('/categories/', {
    params: { inventory_id },
  });
  return res.data;
}

export async function createCategory(
  data: CreateCategoryInput,
  inventory_id: number
): Promise<Category> {
  const res = await api.post('/categories/', data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

export async function deleteCategory(
  id: number,
  inventory_id: number
): Promise<Category> {
  const res = await api.delete(`/categories/${id}`, {
    params: { inventory_id },
  });
  return res.data;
}

export async function renameCategory(
  id: number,
  name: string,
  inventory_id: number
): Promise<Category> {
  const res = await api.put(
    `/categories/${id}`,
    { name },
    { params: { inventory_id } }
  );
  return res.data;
}

export async function getCategory(id: number): Promise<Category> {
  const res = await api.get(`/categories/${id}`);
  return res.data;
}
