// src/pages/InventoryManagerPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import type { Inventory } from '../types';

const InventoryManagerPage: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [name, setName] = useState('');
    const [error] = useState('');

    const fetchInventories = async () => {
        try {
            const res = await api.get('/inventories/owned');
            setInventories(res.data);
        } catch (err) {
            console.error('❌ Failed to load inventories:', err);
        }
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const handleCreate = async () => {
        try {
            await api.post('/inventories/', { name });
            setName('');
            fetchInventories();
        } catch (err) {
            console.error('❌ Error fetching inventories:', err);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Manage Your Inventories</h1>

            <div className="mb-6">
                <input
                    className="border p-2 mr-2 w-2/3"
                    placeholder="New Inventory Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className="bg-emerald-600 text-white px-4 py-2 rounded"
                    onClick={handleCreate}
                >
                    Create
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <ul className="space-y-2">
                {inventories.map((inv) => (
                    <li key={inv.id} className="border p-2 rounded bg-gray-100 flex justify-between items-center">
                        <span>{inv.name}</span>
                        <div>
                            {/* Placeholder for Rename/Delete buttons */}
                            <button className="text-blue-500 mr-3">Rename</button>
                            <button className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryManagerPage;
