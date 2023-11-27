import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';
  const isAdmin = user?.app_metadata?.role === 'admin';

  return { isLoading, user, isAuthenticated, isAdmin };
};
