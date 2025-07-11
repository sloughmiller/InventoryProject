import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { fetchCurrentUser } from '../api/api';
import Layout from '../components/Layout';
import { useSelectedInventory } from '../contexts/SelectedInventoryContext';
import { log } from '../utils/logger';

const DashboardPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { selectedInventory } = useSelectedInventory();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setUsername(user.username);
        log.info('DashboardPage', `👤 Loaded user: ${user.username}`);
      } catch (err) {
        console.error('❌ Failed to fetch current user:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const isInvalid = !selectedInventory || !selectedInventory.id;
    if (isInvalid) {
      log.warn('DashboardPage', '⚠️ No valid inventory selected. Showing modal.');
      setShowModal(true);
    }
    log.debug('DashboardPage', '📦 Current selected inventory:', selectedInventory);
  }, [selectedInventory]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <header className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-700">📊 Dashboard</h2>
          {loading ? (
            <p className="text-gray-500">Loading your profile...</p>
          ) : (
            <>
              <p className="text-lg">
                👋 Welcome, <span className="font-semibold text-blue-600">{username}</span>!
              </p>
            </>
          )}
        </header>


        <nav className="flex flex-wrap justify-center gap-4">
          <Link to="/items">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition">
              📦 View Items
            </button>
          </Link>
          <Link to="/categories">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition">
              📂 View Categories
            </button>
          </Link>
          <Link to="/locations">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow transition">
              📍 View Locations
            </button>
          </Link>
          <Link to="/select-inventory">
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow transition">
              🔁 Switch Inventory
            </button>
          </Link>
          <Link to="/manage-inventories">
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded shadow transition">
              ➕ Manage Inventories
            </button>
          </Link>
        </nav>


        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">👤 My Profile</h3>
          <UserProfile />
        </section>
      </div>

      {/* Modal for no inventory selected */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-600">No Inventory Selected</h2>
            <p className="text-gray-700">
              You must select or create an inventory before continuing.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => navigate('/select-inventory')}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
              >
                Select Inventory
              </button>
              <button
                onClick={() => navigate('/manage-inventories')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
              >
                Manage Inventories
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;
