import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== '/dashboard';

  const handleBack = () => {
    navigate('/dashboard'); // or use navigate(-1) if you want dynamic history
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative flex justify-between items-center p-4 bg-white shadow-md">
        {showBackButton ? (
          <button onClick={handleBack} className="text-emerald-600 hover:text-emerald-800">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        ) : <div />}

        {showBackButton && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        )}
      </div>

      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
