// src/api/locationApi.ts
import api from './api';

export interface Location {
  id: number;
  name: string;
  description?: string;
  inventory_id: number; // ✅ must be present in full Location object
}

export interface CreateLocationInput {
  name: string;
  description?: string;
  inventory_id: number;
}

export async function getLocations(): Promise<Location[]> {
  const res = await api.get('/locations/');
  return res.data;
}

export async function createLocation(data: CreateLocationInput): Promise<Location> {
  console.log('📨 Sending to backend:', data);
  const res = await api.post('/locations/', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export async function updateLocation(id: number, data: Partial<CreateLocationInput>): Promise<Location> {
  const res = await api.put(`/locations/${id}`, data);
  return res.data;
}

export async function deleteLocation(id: number): Promise<Location> {
  const res = await api.delete(`/locations/${id}`);
  return res.data;
}
