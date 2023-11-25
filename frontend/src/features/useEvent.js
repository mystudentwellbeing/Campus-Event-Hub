import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getEvent } from './../services/apiEvents';

const useEvent = () => {
  const { eventId } = useParams();

  const {
    isLoading,
    data: event,
    error,
  } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
    retry: false,
  });

  return { isLoading, error, event };
};

export default useEvent;
