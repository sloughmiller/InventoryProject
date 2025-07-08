import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import InventoryManagerPage from './pages/InventoryManagerPage';
import ItemsPage from './pages/ItemsPage';
import CategoriesPage from './pages/CategoriesPage';
import LocationsPage from './pages/LocationsPage';

import ProtectedRoute from './components/ProtectedRoute';
import { checkBackendAvailable } from './api/api';
import InventorySelectorPage from './pages/InventorySelectorPage';
import PostLoginRouter from './routes/PostLoginRouter';

import { log } from './utils/logger';

const App: React.FC = () => {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    log.info('App', '🔍 API URL:', import.meta.env.VITE_API_URL);

    const pingBackend = async () => {
      const available = await checkBackendAvailable();
      log.info('App', '✅ Backend reachable:', available);
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
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        log.fatal('App', '❌ Uncaught error in global boundary:', error);
        return (
          <div>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        );
      }}
    >
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
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locations"
            element={
              <ProtectedRoute>
                <LocationsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
