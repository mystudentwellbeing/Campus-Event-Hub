import { useQuery } from '@tanstack/react-query';
import { getEventsCreatedByUser } from '../../services/apiEvents';

export const useSubmittedEvents = (userId) => {
  const {
    isLoading,
    data: submittedEvents,
    error,
    refetch,
  } = useQuery({
    queryKey: ['submittedEvents', userId],
    queryFn: () => getEventsCreatedByUser(userId),
    enabled: !!userId,
  });

  const refetchSubmittedEvents = () => {
    refetch();
  };

  console.log('Submitted Events:', submittedEvents);
  return { submittedEvents, isLoading, error, refetchSubmittedEvents };
};
