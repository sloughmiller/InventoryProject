import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import InventoryManagerPage from './pages/InventoryManagerPage';

import ProtectedRoute from './components/ProtectedRoute';

import { checkBackendAvailable } from './api/api';

import InventorySelectorPage from './pages/InventorySelectorPage';
import PostLoginRouter from './routes/PostLoginRouter'



const App: React.FC = () => {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);



  console.log("🔍 API URL:", import.meta.env.VITE_API_URL);


  useEffect(() => {
    const pingBackend = async () => {
      const available = await checkBackendAvailable();
      setBackendOnline(available);
    };
    pingBackend();
  }, []);

  if (backendOnline === null) {
    return <p>Checking backend status...</p>;
  }

  if (!backendOnline) {
    return (
      <div>
        <h1>Backend Unavailable</h1>
        <p>The API server is currently unreachable. Please ensure it is running.</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostLoginRouter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-inventory"
          element={
            <ProtectedRoute>
              <InventorySelectorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-inventories"
          element={
            <ProtectedRoute>
              <InventoryManagerPage />
            </ProtectedRoute>
          }
        />


        {/* Other routes like /items, /categories, etc. */}
      </Routes>


    </Router>
  );
};

export default App;
