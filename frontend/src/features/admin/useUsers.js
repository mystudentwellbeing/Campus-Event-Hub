import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../services/apiAuth';

const useUsers = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  return {
    isLoading,
    error,
    users: data,
  };
};

export default useUsers;
