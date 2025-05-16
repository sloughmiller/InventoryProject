import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSuccess = () => navigate('/dashboard');
  const goToSignup = () => navigate('/signup');

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white px-6 py-10">
      <h1 className="text-3xl font-semibold text-center text-gray-900">Welcome Back</h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Log in to continue managing your inventory.
      </p>

      <div className="mt-8">
        <LoginForm onLoginSuccess={handleSuccess} />
      </div>

      <p className="mt-6 text-center text-sm text-gray-700">
        Don’t have an account?{' '}
        <button
          onClick={goToSignup}
          className="text-blue-600 hover:underline font-medium"
        >
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
