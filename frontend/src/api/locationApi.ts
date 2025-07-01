// src/api/locationApi.ts
import api from './api';

export interface Location {
  id: number;
  name: string;
  description?: string;
}

// ✅ GET all locations
export async function getLocations(): Promise<Location[]> {
  const res = await api.get('/locations/');
  return res.data;
}

// ✅ POST a new location
export async function createLocation(data: Omit<Location, 'id'>): Promise<Location> {
  const res = await api.post('/locations/', data);
  return res.data;
}

// ✅ PUT (update) an existing location
export async function updateLocation(id: number, data: Partial<Location>): Promise<Location> {
  const res = await api.put(`/locations/${id}`, data);
  return res.data;
}

// ✅ DELETE a location
export async function deleteLocation(id: number): Promise<Location> {
  const res = await api.delete(`/locations/${id}`);
  return res.data;
}
