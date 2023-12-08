import { useQuery } from '@tanstack/react-query';
import { getAllPendingEvents } from '../../services/apiEvents';

const usePendingEventsCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pendingEventsCount'],
    queryFn: getAllPendingEvents,
  });

  return {
    count: data,
    isLoading,
    error,
  };
};

export default usePendingEventsCount;
