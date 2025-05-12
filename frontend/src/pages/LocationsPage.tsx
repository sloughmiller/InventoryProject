// src/pages/LocationsPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface Location {
  id: number;
  name: string;
  description?: string;
}

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const fetchLocations = async () => {
    try {
      const response = await api.get('/locations/');
      setLocations(response.data);
    } catch (err) {
      console.error('❌ Failed to fetch locations:', err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/locations/', { name, description });
      setName('');
      setDescription('');
      setError('');
      fetchLocations();
    } catch (err) {
      console.error('❌ Failed to create location:', err);
      setError('Failed to create location.');
    }
  };

  return (
    <div>
      <h2>📍 Locations</h2>

      <form onSubmit={handleSubmit}>
        <h4>Add New Location</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          placeholder="Location Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">➕ Add Location</button>
      </form>

      <ul style={{ marginTop: '2rem' }}>
        {locations.map((loc) => (
          <li key={loc.id}>
            <strong>{loc.name}</strong> — {loc.description || 'No description'} (ID: {loc.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsPage;
