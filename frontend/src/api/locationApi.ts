// src/api/locationApi.ts
import api from './api';

export interface Location {
  id: string;
  name: string;
  description?: string;
  inventory_id: string;
}

export interface CreateLocationInput {
  name: string;
  description?: string;
}

export async function getLocationsForInventory(inventory_id: string): Promise<Location[]> {
  const res = await api.get('/locations/', {
    params: { inventory_id },
  });
  return res.data;
}

export async function createLocation(
  data: CreateLocationInput,
  inventory_id: string
): Promise<Location> {
  const res = await api.post('/locations/', data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

export async function updateLocation(
  id: string,
  data: Partial<CreateLocationInput>,
  inventory_id: string
): Promise<Location> {
  const res = await api.put(`/locations/${id}`, data, {
    params: { inventory_id },
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

export async function deleteLocation(
  id: string,
  inventory_id: string
): Promise<Location> {
  const res = await api.delete(`/locations/${id}`, {
    params: { inventory_id },
  });
  return res.data;
}


export async function getLocation(id: string): Promise<Location> {
  const res = await api.get(`/locations/${id}`);
  return res.data;
}
