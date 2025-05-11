import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { checkBackendAvailable } from './api/api';

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
    return <p>Checking backend status...</p>; // optional: spinner
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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
