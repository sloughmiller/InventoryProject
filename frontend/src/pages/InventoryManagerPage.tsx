// src/pages/InventoryManagerPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import type { Inventory } from '../types';
import Layout from '../components/Layout';
import { log } from '../utils/logger';

const InventoryManagerPage: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [name, setName] = useState('');
    const [error] = useState('');

    const fetchInventories = async () => {
        try {
            const res = await api.get('/inventories/');
            setInventories(res.data);
            log.info('InventoryManagerPage', '📦 Inventories loaded:', res.data);
        } catch (err) {
            log.error('InventoryManagerPage', '❌ Failed to load inventories:', err);
        }
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const handleCreate = async () => {
        try {
            log.info('InventoryManagerPage', `➕ Creating inventory: ${name}`);
            await api.post('/inventories/', { name });
            setName('');
            fetchInventories();
        } catch (err) {
            log.error('InventoryManagerPage', '❌ Failed to create inventory:', err);
        }
    };

    const handleRename = async (inv: Inventory) => {
        const newName = prompt('Enter new inventory name:', inv.name);
        if (!newName || newName === inv.name) return;
        try {
            log.info('InventoryManagerPage', `✏️ Renaming inventory ${inv.id} to "${newName}"`);
            await api.put(`/inventories/${inv.id}`, { name: newName });
            fetchInventories();
        } catch (err) {
            log.error('InventoryManagerPage', `❌ Failed to rename inventory ${inv.id}:`, err);
        }
    };

    const handleDelete = async (inv: Inventory) => {
        const confirmDelete = confirm(`Delete inventory "${inv.name}"?`);
        if (!confirmDelete) return;
        try {
            log.info('InventoryManagerPage', `🗑️ Deleting inventory ${inv.id}`);
            await api.delete(`/inventories/${inv.id}`);
            fetchInventories();
        } catch (err) {
            log.error('InventoryManagerPage', `❌ Failed to delete inventory ${inv.id}:`, err);
        }
    };

    return (
        <Layout>
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
                        <li
                            key={inv.id}
                            className="border p-2 rounded bg-gray-100 flex justify-between items-center"
                        >
                            <span>{inv.name}</span>
                            <div>
                                <button
                                    className="text-blue-500 hover:underline mr-3"
                                    onClick={() => handleRename(inv)}
                                >
                                    Rename
                                </button>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(inv)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default InventoryManagerPage;
