import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useSelectedInventory } from '../contexts/SelectedInventoryContext';
import { log } from '../utils/logger';

const PostLoginRouter: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedInventory } = useSelectedInventory();

  useEffect(() => {
    const checkInventories = async () => {
      try {
        // ✅ Slight delay to ensure AuthContext + Axios header are fully in place
        await new Promise((resolve) => setTimeout(resolve, 100));

        const res = await api.get('/inventories/accessible');
        const inventories = res.data;
        log.info('PostLoginRouter', 'Accessible inventories:', inventories);

        if (inventories.length === 1) {
          const [single] = inventories;
          log.info('PostLoginRouter', '✅ One inventory found, selecting:', single.id);
          setSelectedInventory(single);
          navigate('/dashboard', { replace: true });
        } else {
          log.info('PostLoginRouter', `🔀 ${inventories.length} inventories found. Redirecting to selector.`);
          navigate('/select-inventory', { replace: true });
        }
      } catch (err) {
        log.error('PostLoginRouter', '❌ Failed to fetch inventories after login:', err);
        navigate('/login');
      }
    };

    checkInventories();
  }, [navigate, setSelectedInventory]);


  return <p className="text-center mt-10 text-gray-500">Loading your inventories...</p>;
};

export default PostLoginRouter;
