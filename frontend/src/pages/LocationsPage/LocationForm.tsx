import React, { useState } from 'react';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import { createLocation } from '../../api/locationApi';
import BaseCard from '../../components/cards/BaseCard';
import toast from 'react-hot-toast';

interface LocationFormProps {
  onCreated: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { selectedInventory, loading } = useSelectedInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInventory || loading) {
      setError('Inventory not selected. Please select or reload.');
      console.error('❌ Cannot submit — inventory missing or still loading.');
      return;
    }

    const payload = {
      name,
      description: description || undefined,
    };

    console.log('📦 Location payload:', payload);

    try {
      const result = await createLocation(payload, selectedInventory.id);
      console.log('✅ Location created successfully:', result);
      setName('');
      setDescription('');
      setError('');
      onCreated();
      toast.success(`✅ Location "${name}" added`);
    } catch (err) {
      console.error('❌ Failed to create location:', err);
      setError('Could not create location.');
    }
  };

  return (
    <BaseCard title="➕ Add New Location" description="Enter a name and optional description.">
      {error && (
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Location Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-400"
        />
        <input
          type="text"
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
    </BaseCard>
  );
};

export default LocationForm;
