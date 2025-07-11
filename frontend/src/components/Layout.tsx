import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { log } from '../utils/logger';
import { useSelectedInventory } from '../contexts/SelectedInventoryContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedInventory } = useSelectedInventory();

  const isDashboard = location.pathname === '/dashboard';
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  const handleBack = () => {
    log.info('Layout', '🔙 Navigating back to dashboard');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    log.info('Layout', '🚪 Logging out and clearing token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRefresh = () => {
    log.debug('Layout', '🔄 Manual refresh triggered');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthPage && (
        <>
          <div className="relative flex items-center justify-between p-4 bg-white shadow-md">
            {/* Back button (left) */}
            {!isDashboard ? (
              <button onClick={handleBack} className="text-emerald-600 hover:text-emerald-800">
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
            ) : (
              <div className="w-6" />
            )}

            {/* Spacer (center) */}
            <div />

            {/* Right-side controls */}
            <div className="flex items-center space-x-3">
              {/* ✅ Refresh button */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded hover:bg-emerald-200 text-emerald-700"
                title="Refresh"
              >
                <ArrowPathIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Refresh</span>
              </button>

              {/* ✅ Logout (only on dashboard) */}
              {isDashboard ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="w-16" />
              )}
            </div>
          </div>

          {/* ✅ Active inventory indicator */}
          {selectedInventory && (
            <div className="px-4 py-2 text-center bg-gray-50 text-sm text-gray-600">
              Active Inventory: <span className="font-semibold text-emerald-700">{selectedInventory.name}</span>
            </div>
          )}
        </>
      )}

      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
