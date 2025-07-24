import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import { useSelectedInventory } from '../../contexts/SelectedInventoryContext';
import {
  getLocationsForInventory,
  updateLocation,
  deleteLocation,
  type Location,
} from '../../api/locationApi';
import { useInventoryFetcher } from '../../hooks/useInventoryFetcher';
import { log } from '../../utils/logger';
import LocationCard from './LocationCard';
import LocationForm from './LocationForm';

const LocationsPage: React.FC = () => {
  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();

  const {
    data: locations,
    error: fetchError,
    //loading,
    refetch,
  } = useInventoryFetcher<Location>(getLocationsForInventory);

  useEffect(() => {
    if (selectedInventory && !inventoryLoading) {
      log.debug('LocationsPage', '🔄 Triggering location refetch...');
      refetch();
    }
  }, [selectedInventory?.id, inventoryLoading]);

  const handleEdit = async (location: Location) => {
    const newName = prompt('Enter new location name:', location.name);
    const newDescription = prompt('Enter new description (optional):', location.description || '');

    if (!newName || !selectedInventory?.id) return;

    try {
      log.info('LocationsPage', `✏️ Updating location ID ${location.id}`);
      await updateLocation(
        location.id,
        { name: newName, description: newDescription || undefined },
        selectedInventory.id
      );
      refetch();
    } catch (err) {
      log.error('LocationsPage', `❌ Failed to update location ID ${location.id}:`, err);
    }
  };

  const handleDelete = async (location: Location) => {
    if (!selectedInventory?.id) return;

    const confirmDelete = confirm(`Delete location "${location.name}"?`);
    if (!confirmDelete) return;

    try {
      log.info('LocationsPage', `🗑️ Deleting location ID ${location.id}`);
      await deleteLocation(location.id, selectedInventory.id);
      refetch();
    } catch (err) {
      log.error('LocationsPage', `❌ Failed to delete location ID ${location.id}:`, err);
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
          <LocationForm onCreated={refetch} />
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-emerald-700 mb-4">📋 Existing Locations</h3>
          {fetchError && (
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">{fetchError}</p>
          )}
          <div className="space-y-2">
            {locations.length === 0 ? (
              <p className="text-gray-500 text-center">No locations found.</p>
            ) : (
              locations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  onEdit={() => handleEdit(loc)}
                  onDelete={() => handleDelete(loc)}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LocationsPage;
