// src/pages/LocationsPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Layout from '../components/Layout';

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
            <div>
              <input
                placeholder="Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-400"
              />
            </div>
            <div>
              <input
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-emerald-400"
              />
            </div>
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
          <ul className="space-y-2">
            {locations.map((loc) => (
              <li key={loc.id} className="bg-white p-4 shadow rounded">
                <strong className="text-emerald-700">{loc.name}</strong> —{' '}
                <span className="text-gray-700">
                  {loc.description || 'No description'}
                </span>{' '}
                <span className="text-gray-500 text-sm">(ID: {loc.id})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default LocationsPage;
