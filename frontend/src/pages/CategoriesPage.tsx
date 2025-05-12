import React, { useEffect, useState } from 'react';
import api from '../api/api';

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
    <div>
      <h2>🏷️ Categories</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <button type="submit">➕ Add Category</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <h3>📋 Existing Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <strong>{cat.name}</strong> (ID: {cat.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
