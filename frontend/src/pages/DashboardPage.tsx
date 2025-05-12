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
    <div>
      <h2>📊 Dashboard</h2>

      {loading ? (
        <p>Loading your profile...</p>
      ) : (
        <p>👋 Welcome, <strong>{username}</strong>!</p>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={handleLogout}>🚪 Logout</button>
        <Link to="/items">
          <button>📦 View Items</button>
        </Link>
        <Link to="/categories">
          <button>📂 View Categories</button>
        </Link>
        <Link to="/locations">
          <button>📍 View Locations</button>
        </Link>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h3>👤 My Profile</h3>
        <UserProfile />
      </section>

      <section>
        <h3>📋 All Users</h3>
        <UserList />
      </section>
    </div>
  );
};

export default DashboardPage;