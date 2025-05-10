import React from 'react';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSuccess = () => navigate('/login');

  return <SignupForm onSignupSuccess={handleSuccess} />;
};

export default SignupPage;
