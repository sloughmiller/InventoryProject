import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import UserList from '../components/UserList';
import { fetchCurrentUser } from '../api/api';

const DashboardPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setUsername(user.username);
      } catch (err) {
        console.error("❌ Failed to fetch current user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">📊 Dashboard</h2>

      {loading ? (
        <p className="text-gray-600">Loading your profile...</p>
      ) : (
        <p className="text-lg mb-4">
          👋 Welcome, <strong className="text-blue-600">{username}</strong>!
        </p>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          🚪 Logout
        </button>

        <Link to="/items">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            📦 View Items
          </button>
        </Link>

        <Link to="/categories">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            📂 View Categories
          </button>
        </Link>

        <Link to="/locations">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            📍 View Locations
          </button>
        </Link>
      </div>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">👤 My Profile</h3>
        <div className="bg-white shadow rounded p-4">
          <UserProfile />
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-2">📋 All Users</h3>
        <div className="bg-white shadow rounded p-4">
          <UserList />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
