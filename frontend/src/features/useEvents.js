import { useQuery } from '@tanstack/react-query';
import { getEvents } from './../services/apiEvents';

const useEvents = () => {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const eventCountsByType = events?.reduce((acc, event) => {
    event.type.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {});

  return {
    isLoading,
    error,
    events,
    eventCountsByType,
  };
};

export default useEvents;
