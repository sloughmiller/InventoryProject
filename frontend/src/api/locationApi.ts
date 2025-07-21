// src/api/locationApi.ts
import api from './api';

export interface Location {
  id: number;
  name: string;
  description?: string;
  inventory_id: number; // ✅ must be present in full Location object
}

// ✅ Input for creating a new location
export interface CreateLocationInput {
  name: string;
  description?: string;
  inventory_id: number;
}

// ✅ Input for updating a location
export interface UpdateLocationInput {
  name?: string;
  description?: string;
  // optional: inventory_id if you ever allow moving a location to another inventory
  inventory_id?: number;
}

// ✅ GET all locations (already scoped by inventory via backend)
export async function getLocations(): Promise<Location[]> {
  const res = await api.get('/locations/');
  return res.data;
}

// ✅ POST a new location (now includes inventory_id)
export async function createLocation(data: CreateLocationInput): Promise<Location> {
  const res = await api.post('/locations/', data);
  return res.data;
}

// ✅ PUT update (e.g. name or description)
export async function updateLocation(id: number, data: UpdateLocationInput): Promise<Location> {
  const res = await api.put(`/locations/${id}`, data);
  return res.data;
}

// ✅ DELETE
export async function deleteLocation(id: number): Promise<Location> {
  const res = await api.delete(`/locations/${id}`);
  return res.data;
}
