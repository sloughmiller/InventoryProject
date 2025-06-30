import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { fetchCurrentUser } from '../api/api';
import Layout from '../components/Layout';

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
    <Layout>
      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* 🔒 Logout Button (Top Right) */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
        >
          🚪 Logout
        </button>

        <header className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-700">📊 Dashboard</h2>
          {loading ? (
            <p className="text-gray-500">Loading your profile...</p>
          ) : (
            <p className="text-lg">
              👋 Welcome, <span className="font-semibold text-blue-600">{username}</span>!
            </p>
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
        </nav>

        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">👤 My Profile</h3>
          <UserProfile />
        </section>
      </div>
    </Layout>
  );
};


export default DashboardPage;
