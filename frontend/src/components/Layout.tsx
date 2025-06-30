// src/components/Layout.tsx
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-emerald-500 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
