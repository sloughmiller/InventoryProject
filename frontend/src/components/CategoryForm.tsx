// src/components/CategoryForm.tsx
import React, { useState } from 'react';
import api from '../api/api';

interface CategoryFormProps {
  onCreated: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories/', { name });
      setName('');
      onCreated();
    } catch (err) {
      console.error('❌ Failed to create category:', err);
      setError('Could not create category.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Category</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">➕ Add Category</button>
    </form>
  );
};

export default CategoryForm;
