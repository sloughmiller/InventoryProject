import React, { useState } from 'react';
import api from '../api/api';
import { useSelectedInventory } from '../contexts/SelectedInventoryContext';

interface LocationFormProps {
  onCreated: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { selectedInventory, loading } = useSelectedInventory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedInventory || loading) {
      setError('Inventory not selected. Please select or reload.');
      return;
    }

    try {
      await api.post('/locations/', {
        name,
        inventory_id: selectedInventory.id,
      });

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
