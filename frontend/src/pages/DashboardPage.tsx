import React from 'react';
import UserProfile from '../components/UserProfile';
import UserList from '../components/UserList';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <UserProfile />
      <UserList />
    </div>
  );
};

export default DashboardPage;
