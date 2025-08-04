import React, { createContext, useState, useContext } from 'react';
import api from '../api/api';
import { decodeUserIdFromToken } from '../utils/authHelpers';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('user_id'));

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const login = (newToken: string) => {
    const uuid = decodeUserIdFromToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user_id', uuid);

    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
    setUserId(uuid);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
