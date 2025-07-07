import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useSelectedInventory } from '../contexts/SelectedInventoryContext';

const PostLoginRouter: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedInventory } = useSelectedInventory();

  useEffect(() => {
    const checkInventories = async () => {
      try {
        const res = await api.get('/inventories/accessible');
        const inventories = res.data;

        if (inventories.length === 1) {
          const [single] = inventories;
          setSelectedInventory(single);
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
  }, [navigate, setSelectedInventory]);

  return <p className="text-center mt-10 text-gray-500">Loading your inventories...</p>;
};

export default PostLoginRouter;
