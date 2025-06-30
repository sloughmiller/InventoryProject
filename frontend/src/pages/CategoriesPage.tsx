import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Layout from '../components/Layout';

interface Category {
  id: number;
  name: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/');
      setCategories(response.data);
    } catch (err) {
      console.error('❌ Failed to load categories:', err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories/', { name: newName });
      setNewName('');
      setError('');
      fetchCategories(); // refresh
    } catch (err) {
      console.error('❌ Failed to create category:', err);
      setError('Could not create category. Make sure the name is valid.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-emerald-700 text-center">🏷️ Categories</h2>

        <form
          onSubmit={handleCreate}
          className="bg-white rounded shadow p-6 space-y-4"
        >
          <h4 className="text-xl font-semibold text-emerald-600">Add New Category</h4>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>
          )}

          <input
            type="text"
            placeholder="New category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-400"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            ➕ Add Category
          </button>
        </form>

        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold text-emerald-600 mb-4">📋 Existing Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="border border-gray-200 rounded px-3 py-2 shadow-sm"
              >
                <strong>{cat.name}</strong> <span className="text-gray-500">(ID: {cat.id})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
