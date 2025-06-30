// src/components/Layout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-emerald-700 text-white px-4 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">🏠 Home Inventory</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-emerald-700 font-semibold px-3 py-1 rounded hover:bg-gray-100"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
