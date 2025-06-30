import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-between p-4 bg-white shadow-md">
        {/* Back Arrow: Show when NOT on dashboard */}
        {!isDashboard ? (
          <button onClick={handleBack} className="text-emerald-600 hover:text-emerald-800">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        ) : (
          <div className="w-6" /> // Keeps layout balanced
        )}

        {/* Spacer to center children if needed */}
        <div />

        {/* Logout Button: Show when ON dashboard */}
        {isDashboard ? (
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
            Logout
          </button>
        ) : (
          <div className="w-16" /> // Adjust width as needed to balance
        )}
      </div>

      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
