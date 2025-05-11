import React, { useState } from 'react';
import api from '../api/api';

interface ItemFormProps {
  onItemCreated: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/items/', {
        name,
        description,
        quantity: Number(quantity),
        category_id: Number(categoryId),
        location_id: Number(locationId),
      });
      // Clear form
      setName('');
      setDescription('');
      setQuantity('');
      setCategoryId('');
      setLocationId('');
      setError('');
      onItemCreated(); // trigger refresh
    } catch (err) {
      console.error('❌ Failed to create item:', err);
      setError('Failed to create item. Make sure all fields are valid.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Item</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Location ID"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        required
      />

      <button type="submit">➕ Add Item</button>
    </form>
  );
};

export default ItemForm;
