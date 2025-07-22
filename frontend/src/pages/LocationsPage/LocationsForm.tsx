import React, { useState } from 'react';
import { useSelectedInventory } from '../../contexts/SelectedInventoryContext';
import { createLocation } from '../../api/locationApi';

interface LocationFormProps {
  onCreated: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { selectedInventory, loading } = useSelectedInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🔍 Submitting new location...');
    console.log('🔁 Selected Inventory:', selectedInventory);
    console.log('📦 Payload:', { name, inventory_id: selectedInventory?.id });

    if (!selectedInventory || loading) {
      setError('Inventory not selected. Please select or reload.');
      console.error('❌ Cannot submit — inventory missing or still loading.');
      return;
    }

    try {
      const result = await createLocation({ name, inventory_id: selectedInventory.id });
      console.log('✅ Location created successfully:', result);
      setName('');
      setError('');
      onCreated();
    } catch (err) {
      console.error('❌ Failed to create location:', err);
      setError('Could not create location.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Location</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder="Location Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">➕ Add Location</button>
    </form>
  );
};

export default LocationForm;
