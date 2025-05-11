// src/components/LocationForm.tsx
import React, { useState } from 'react';
import api from '../api/api';

interface LocationFormProps {
  onCreated: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/locations/', { name });
      setName('');
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
