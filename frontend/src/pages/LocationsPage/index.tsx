import React, { useState } from 'react';
import Layout from '../../components/layout';
import { useSelectedInventory } from '../../contexts/SelectedInventoryContext';
import {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationsForInventory,
  type Location,
} from '../../api/locationApi';
import { useInventoryFetcher } from '../../hooks/useInventoryFetcher';
import LocationCard from './LocationCard';

const LocationsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();

  const {
    data: locations,
    error: fetchError,
    refetch,
  } = useInventoryFetcher<Location>(getLocationsForInventory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInventory || inventoryLoading) {
      setError('Inventory not selected. Please select or reload.');
      return;
    }

    try {
      await createLocation({ name, description: description || undefined }, selectedInventory.id);
      setName('');
      setDescription('');
      setError('');
      refetch();
    } catch (err) {
      console.error('❌ Failed to create location:', err);
      setError('Failed to create location.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!selectedInventory) return;
    try {
      await deleteLocation(id, selectedInventory.id);
      refetch();
    } catch (err) {
      console.error(`❌ Failed to delete location ${id}:`, err);
    }
  };

  const handleEdit = async (id: number) => {
    const newName = prompt('Enter new location name:');
    const newDescription = prompt('Enter new description (optional):');

    if (!newName || !selectedInventory) return;

    try {
      await updateLocation(
        id,
        { name: newName, description: newDescription || undefined },
        selectedInventory.id
      );
      refetch();
    } catch (err) {
      console.error(`❌ Failed to update location ${id}:`, err);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-bold text-emerald-700">📍 Locations</h2>
          <p className="text-gray-600 mt-2">Manage and add inventory locations.</p>
        </header>

        <section className="bg-white shadow-md rounded p-6">
          <h4 className="text-xl font-semibold text-emerald-600 mb-4">➕ Add New Location</h4>
          {error && (
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Location Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-400"
            />
            <input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded"
            >
              Add Location
            </button>
          </form>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-emerald-700 mb-4">📋 Existing Locations</h3>
          {fetchError && (
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">
              {fetchError}
            </p>
          )}
          <div className="space-y-2">
            {locations.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
                onEdit={() => handleEdit(loc.id)}
                onDelete={() => handleDelete(loc.id)}
              />
            ))}
          </div>

        </section>
      </div>
    </Layout>
  );
};

export default LocationsPage;
