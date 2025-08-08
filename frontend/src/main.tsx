import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SelectedInventoryProvider } from './contexts/SelectedInventoryContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { Toaster } from 'react-hot-toast';
import './index.css';
import './api/inventoryInterceptor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <SelectedInventoryProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              success: {
                style: {
                  background: '#d1fae5',
                  color: '#065f46',
                  borderLeft: '4px solid #10b981',
                },
              },
              error: {
                style: {
                  background: '#fee2e2',
                  color: '#991b1b',
                  borderLeft: '4px solid #ef4444',
                },
              },
            }}
          />
        </SelectedInventoryProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
