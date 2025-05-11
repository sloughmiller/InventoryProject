// src/components/ItemForm.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface ItemFormProps {
  onItemCreated: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categories/').then(res => setCategories(res.data));
    api.get('/locations/').then(res => setLocations(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/items/', {
        name,
        description,
        barcode,
        quantity,
        category_id: categoryId,
        location_id: locationId,
      });
      setName('');
      setDescription('');
      setBarcode('');
      setQuantity(1);
      setCategoryId(null);
      setLocationId(null);
      setError('');
      onItemCreated();
    } catch (err) {
      console.error('❌ Failed to create item:', err);
      setError('Failed to create item.');
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
        placeholder="Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />

      <select
        value={categoryId ?? ''}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat: any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name} (ID: {cat.id})
          </option>
        ))}
      </select>

      <select
        value={locationId ?? ''}
        onChange={(e) => setLocationId(Number(e.target.value))}
        required
      >
        <option value="">Select Location</option>
        {locations.map((loc: any) => (
          <option key={loc.id} value={loc.id}>
            {loc.name} (ID: {loc.id})
          </option>
        ))}
      </select>

      <button type="submit">➕ Add Item</button>
    </form>
  );
};

export default ItemForm;
