import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PullToRefresh from 'react-pull-to-refresh';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/dashboard';

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRefresh = async () => {
    window.location.reload(); // Simple and effective for full app refresh
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-between p-4 bg-white shadow-md">
        {!isDashboard ? (
          <button onClick={handleBack} className="text-emerald-600 hover:text-emerald-800">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <div />

        {isDashboard ? (
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
            Logout
          </button>
        ) : (
          <div className="w-16" />
        )}
      </div>

      {/* ✅ Global Pull-To-Refresh wrapper — minimal props for full compatibility */}
      <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
        <main className="p-4">{children}</main>
      </PullToRefresh>
    </div>
  );
};

export default Layout;
