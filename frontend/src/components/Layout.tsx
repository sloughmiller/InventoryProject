// src/components/Layout.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== '/dashboard';

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="bg-emerald-700 text-white px-4 py-3 shadow relative flex justify-center items-center">
        <h1 className="text-xl font-bold">🏠 Home Inventory</h1>

        {showBackButton && (
          <button
            onClick={() => navigate('/dashboard')}
            className="absolute left-4 top-3 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Back to Dashboard"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
