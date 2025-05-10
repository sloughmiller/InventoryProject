import React, { useEffect, useState } from 'react';
import api from '../../../frontend/src/api/api';

interface User {
  id: number;
  username: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
        const response = await api.get<User>('/users/me');
      setUser(response.data);
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h3>Your Profile</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
