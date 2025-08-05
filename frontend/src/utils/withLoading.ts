import { useLoading } from '../contexts/LoadingContext';

export function useWithLoading() {
  const { setLoading } = useLoading();

  const wrap = async <T>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  return wrap;
}
