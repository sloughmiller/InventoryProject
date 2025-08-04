import React, { useState } from 'react';
import api from '../../api/api';

interface SignupFormProps {
  onSignupSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/', { username, email, password });
      const userId = response.data?.id;
      console.log('✅ User created with UUID:', userId);

      // Optionally store it (if you plan to associate future data to this user manually)
      // localStorage.setItem('user_id', userId);

      onSignupSuccess();
    } catch (err) {
      console.error('❌ Signup error:', err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50 px-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold text-blue-800">Create Account</h2>

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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
