import { useQuery } from '@tanstack/react-query';
import { getEventsLikedByUser } from '../../services/apiEventInterests';

export const useEventInterests = (userId) => {
  const {
    isLoading,
    data: likedEvents,
    error,
    refetch,
  } = useQuery({
    queryKey: ['eventInterest', userId],
    queryFn: () => getEventsLikedByUser(userId),
    enabled: !!userId,
  });

  const refetchLikedEvents = () => {
    refetch();
  };
  return { likedEvents, isLoading, error, refetchLikedEvents };
};
