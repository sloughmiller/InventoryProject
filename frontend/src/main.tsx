import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SelectedInventoryProvider } from './contexts/SelectedInventoryContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SelectedInventoryProvider>
        <App />
      </SelectedInventoryProvider>
    </AuthProvider>
  </React.StrictMode>
);
