import React, { useEffect, useState } from 'react';
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

      <button onClick={handleLogout}>🚪 Logout</button>

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
