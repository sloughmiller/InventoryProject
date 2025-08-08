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
import EditModal from '../../components/modals/EditModal';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import Spinner from '../../components/Spinner';
import toast from 'react-hot-toast';


const LocationsPage: React.FC = () => {
  const { selectedInventory, loading: inventoryLoading } = useSelectedInventory();
  const [deletingLocation, setDeletingLocation] = useState<Location | null>(null);


  const {
    data: locations,
    error: fetchError,
    loading: loadingLocations,
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
        { name: newName, description: newDescription },
        selectedInventory.id
      );
      refetch();
    } catch (err) {
      log.error('LocationsPage', `❌ Failed to update location ID ${editingLocation.id}:`, err);
      toast.error('⚠️ Failed to update location');
    } finally {
      setEditingLocation(null);
    }
  };

  const confirmDelete = async () => {
    if (!deletingLocation || !selectedInventory?.id) return;

    try {
      log.info('LocationsPage', `🗑️ Deleting location ID ${deletingLocation.id}`);
      await deleteLocation(deletingLocation.id, selectedInventory.id);
      toast.success('🗑️ Location "${name}" deleted');
      refetch();
    } catch (err) {
      log.error('LocationsPage', `❌ Failed to delete location ID ${deletingLocation.id}:`, err);
      toast.error('❌ Failed to delete location');
    } finally {
      setDeletingLocation(null);
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
          {loadingLocations ? (
            <Spinner />
          ) : locations.length === 0 ? (
            <p className="text-gray-500 text-center">No locations found.</p>
          ) : (
            locations.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
                onEdit={() => setEditingLocation(loc)}
                onDelete={() => setDeletingLocation(loc)}

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
          onSave={async (newName, newDescription) => {
            await handleSaveEdit(newName, newDescription);
            toast.success('📍 Location "${name}" updated');
          }}
        />
      )}
      {deletingLocation && (
        <ConfirmDeleteModal
          isOpen={!!deletingLocation}
          title="Delete Location"
          message={`Are you sure you want to delete "${deletingLocation.name}"?`}
          onClose={() => setDeletingLocation(null)}
          onConfirm={confirmDelete}
        />
      )}


    </Layout>
  );
};

export default LocationsPage;
