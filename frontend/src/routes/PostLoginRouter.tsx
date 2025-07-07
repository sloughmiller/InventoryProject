// src/pages/PostLoginRouter.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const PostLoginRouter: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkInventories = async () => {
      try {
        const res = await api.get('/inventories/accessible');
        const inventories = res.data;

        if (inventories.length === 1) {
          // ✅ Auto-select and redirect
          const [single] = inventories;
          localStorage.setItem('selectedInventoryId', single.id.toString());
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/select-inventory', { replace: true });
        }
      } catch (err) {
        console.error('❌ Failed to fetch inventories after login:', err);
        navigate('/login');
      }
    };

    checkInventories();
  }, [navigate]);

  return <p className="text-center mt-10 text-gray-500">Loading your inventories...</p>;
};

export default PostLoginRouter;
