import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../api/api';
import { useSelectedInventory } from '../contexts/SelectedInventoryContext';
import { log } from '../utils/logger';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedInventory } = useSelectedInventory();

  const handleSuccess = async () => {
    try {
      const response = await api.get('/inventories/accessible');
      const inventories = response.data;

      if (inventories.length === 1) {
        log.info('LoginPage', '🔐 One inventory found, auto-selecting and navigating to dashboard');
        setSelectedInventory(inventories[0]);
        localStorage.setItem('selectedInventory', JSON.stringify(inventories[0]));
        navigate('/dashboard');
      } else {
        log.info('LoginPage', `🔐 ${inventories.length} inventories found, navigating to selector`);
        navigate('/select-inventory');
      }
    } catch (err) {
      log.error('LoginPage', '❌ Failed to load inventories after login', err);
      navigate('/dashboard'); // fallback
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
