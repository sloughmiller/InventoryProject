import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-gray-900 px-4 py-10">
      {/* Optional: Add a site title, logo, nav bar, etc. */}
      <main className="w-full max-w-md">{children}</main>
    </div>
  );
};

export default Layout;
