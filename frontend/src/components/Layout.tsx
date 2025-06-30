import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-gray-900">
            <main className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-md">
                {children}
            </main>
        </div>
    );
};

export default Layout;
