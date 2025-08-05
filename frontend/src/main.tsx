import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SelectedInventoryProvider } from './contexts/SelectedInventoryContext';
import { LoadingProvider } from './contexts/LoadingContext'; // ✅ Add this
import './index.css';
import './api/inventoryInterceptor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider> {/* ✅ Wrap the entire app */}
      <AuthProvider>
        <SelectedInventoryProvider>
          <App />
        </SelectedInventoryProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
