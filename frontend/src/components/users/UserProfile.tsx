// src/components/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';

interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (err) {
        setError('⚠️ Failed to load user profile.');
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = () => {
    alert('🔧 Update functionality coming soon!');
    // Future: open a modal or redirect to update form
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user profile...</p>;

  return (
    <div>
      <h2>👤 Your Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.is_active ? 'Active' : 'Inactive'}</p>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default UserProfile;
