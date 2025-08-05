import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
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
import EditModal from '../../components/modals/EditModal'; // ✅ Modal component

const LocationsPage: React.FC = () => {
  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();

  const {
    data: locations,
    error: fetchError,
    refetch,
  } = useInventoryFetcher<Location>(getLocationsForInventory);

  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (selectedInventory && !inventoryLoading) {
      log.debug('LocationsPage', '🔄 Triggering location refetch...');
      refetch();
    }
  }, [selectedInventory?.id, inventoryLoading]);

  const handleSaveEdit = async (newName: string, newDescription?: string) => {
    if (!editingLocation || !selectedInventory?.id || !newName) return;

    try {
      log.info('LocationsPage', `✏️ Updating location ID ${editingLocation.id}`);
      await updateLocation(
        editingLocation.id,
        { name: newName, description: newDescription || undefined },
        selectedInventory.id
      );
      refetch();
    } catch (err) {
      log.error('LocationsPage', `❌ Failed to update location ID ${editingLocation.id}:`, err);
    } finally {
      setEditingLocation(null);
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
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">📍 Locations</h1>
          <p className="text-gray-500">Manage and add inventory locations.</p>
        </header>

        <LocationForm onCreated={refetch} />

        {fetchError && (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded text-center">{fetchError}</p>
        )}

        <div className="space-y-2">
          {locations.length === 0 ? (
            <p className="text-gray-500 text-center">No locations found.</p>
          ) : (
            locations.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
                onEdit={() => setEditingLocation(loc)}
                onDelete={() => handleDelete(loc)}
              />
            ))
          )}
        </div>
      </div>

      {/* ✅ Modal for editing */}
      {editingLocation && (
        <EditModal
          isOpen={!!editingLocation}
          title="Edit Location"
          currentValue={editingLocation.name}
          currentDescription={editingLocation.description}
          onClose={() => setEditingLocation(null)}
          onSave={(newName, newDescription) => handleSaveEdit(newName, newDescription)}
        />
      )}
    </Layout>
  );
};

export default LocationsPage;
