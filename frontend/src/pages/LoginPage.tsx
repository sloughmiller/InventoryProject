import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSuccess = () => navigate('/dashboard');

  return <LoginForm onLoginSuccess={handleSuccess} />;
};

export default LoginPage;
