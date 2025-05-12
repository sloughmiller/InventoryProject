// src/components/ItemForm.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface Category {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

interface ItemFormProps {
  onItemCreated?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // category name
  const [selectedLocation, setSelectedLocation] = useState<string>(''); // location name
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categories/').then(res => setCategories(res.data));
    api.get('/locations/').then(res => setLocations(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const category = categories.find(c => c.name === selectedCategory);
    const location = locations.find(l => l.name === selectedLocation);

    if (!category || !location) {
      setError('Please select valid category and location.');
      return;
    }

    try {
      await api.post('/items/', {
        name,
        description,
        quantity,
        category_id: category.id,
        location_id: location.id,
      });

      setName('');
      setDescription('');
      setQuantity(1);
      setSelectedCategory('');
      setSelectedLocation('');
      setError('');
      onItemCreated?.();
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
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        required
      >
        <option value="">Select Location</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      <button type="submit">➕ Add Item</button>
    </form>
  );
};

export default ItemForm;
