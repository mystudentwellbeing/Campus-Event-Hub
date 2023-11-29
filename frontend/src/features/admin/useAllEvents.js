import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '../../services/apiEvents';

const useAllEvents = () => {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['allEvents'],
    queryFn: getAllEvents,
  });

  return {
    isLoading,
    error,
    events,
  };
};

export default useAllEvents;
