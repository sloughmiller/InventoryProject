// src/api/locationApi.ts
import api from './api';

export interface Location {
  id: number;
  name: string;
  description?: string;
  inventory_id: number;
}

export interface CreateLocationInput {
  name: string;
  description?: string;
}

export async function getLocationsForInventory(inventory_id: number): Promise<Location[]> {
  const res = await api.get('/locations/', {
    params: { inventory_id },
  });
  return res.data;
}

export async function createLocation(
  data: CreateLocationInput,
  inventory_id: number
): Promise<Location> {
  const res = await api.post('/locations/', data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

export async function updateLocation(
  id: number,
  data: Partial<CreateLocationInput>,
  inventory_id: number
): Promise<Location> {
  const res = await api.put(`/locations/${id}`, data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

export async function deleteLocation(
  id: number,
  inventory_id: number
): Promise<Location> {
  const res = await api.delete(`/locations/${id}`, {
    params: { inventory_id },
  });
  return res.data;
}
