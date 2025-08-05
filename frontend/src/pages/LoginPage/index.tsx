// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/index';
import api from '../../api/api';
import { useSelectedInventory } from '../../hooks/useSelectedInventory';
import { log } from '../../utils/logger';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedInventory } = useSelectedInventory();

  const handleSuccess = async () => {
    try {
      const res = await api.get('/inventories/accessible');
      const inventories = res.data;

      if (inventories.length === 1) {
        const inv = inventories[0];
        log.info('LoginPage', `✅ One inventory found: "${inv.name}", auto-selecting and navigating to dashboard`);
        setSelectedInventory(inv); // Context + localStorage
        navigate('/dashboard');
      } else {
        if (inventories.length === 0) {
          log.info('LoginPage', '👤 No inventories found, redirecting to selector so user can create one');
        } else {
          log.info('LoginPage', `📦 ${inventories.length} inventories found, redirecting to selector`);
        }
        navigate('/dashboard');
      }
    } catch (err) {
      log.error('LoginPage', '❌ Failed to fetch inventories after login', err);
    }
  };

  const goToSignup = () => navigate('/signup');

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center">Welcome Back</h1>
      <p className="mt-2 text-center text-sm text-gray-50">
        Log in to continue managing your inventory.
      </p>

      <div className="mt-8">
        <LoginForm onLoginSuccess={handleSuccess} />
      </div>

      <p className="mt-6 text-center text-sm text-blue-700">
        Don’t have an account?{' '}
        <button
          onClick={goToSignup}
          className="text-green-600 hover:underline font-medium"
        >
          Sign up here
        </button>
      </p>
    </Layout>
  );
};

export default LoginPage;
