import React, { useState } from 'react';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('grant_type', 'password');

      const response = await api.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      login(response.data.access_token);
      onLoginSuccess();
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-blue-800">Login</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
          {error}
        </p>
      )}

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 transition"
      >
        Login
      </button>
    </form>
  );
};
export default LoginForm;
