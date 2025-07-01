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

interface Item {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  category_id: number;
  location_id: number;
}

interface ItemFormProps {
  onItemCreated?: () => void;
  editingItem?: Item | null;
  onEditDone?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemCreated, editingItem, onEditDone }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [catRes, locRes] = await Promise.all([
        api.get('/categories/'),
        api.get('/locations/'),
      ]);
      setCategories(catRes.data);
      setLocations(locRes.data);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description || '');
      setQuantity(editingItem.quantity !== undefined ? editingItem.quantity.toString() : '1');



      // Try to match category/location name from ID
      const fetchNames = async () => {
        try {
          const catRes = await api.get(`/categories/${editingItem.category_id}`);
          const locRes = await api.get(`/locations/${editingItem.location_id}`);
          setSelectedCategory(catRes.data.name);
          setSelectedLocation(locRes.data.name);
        } catch (err) {
          console.error('❌ Failed to load category or location names', err);
        }
      };
      fetchNames();
    } else {
      // Reset form if switching away from editing
      setName('');
      setDescription('');
      setQuantity('');
      setSelectedCategory('');
      setSelectedLocation('');
      setError('');
    }
  }, [editingItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const category = categories.find((c) => c.name === selectedCategory);
    const location = locations.find((l) => l.name === selectedLocation);

    if (!category || !location) {
      setError('Please select valid category and location.');
      return;
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      setError('Quantity must be a valid number.');
      return;
    }

    try {
      if (editingItem) {
        await api.put(`/items/${editingItem.id}`, {
          name,
          description,
          quantity: parsedQuantity, // ✅ FIXED: use parsed int
          category_id: category.id,
          location_id: location.id,
        });
        onEditDone?.();
      } else {
        // Create mode: POST
        await api.post('/items/', {
          name,
          description,
          quantity: parsedQuantity,
          category_id: category.id,
          location_id: location.id,
        });

        onItemCreated?.();
      }

      // Reset form
      setName('');
      setDescription('');
      setQuantity('');
      setSelectedCategory('');
      setSelectedLocation('');
      setError('');
    } catch (err) {
      console.error('❌ Failed to save item:', err);
      setError('Failed to save item.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-xl font-semibold">
        {editingItem ? '✏️ Edit Item' : '➕ Add New Item'}
      </h4>

      {error && <p className="text-red-600">{error}</p>}

      <input
        className="w-full border p-2 rounded"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />



      <select
        className="w-full border p-2 rounded"
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
        className="w-full border p-2 rounded"
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

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded"
      >
        {editingItem ? '💾 Save Changes' : '➕ Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
