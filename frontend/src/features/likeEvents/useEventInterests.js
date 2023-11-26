import { useQuery } from '@tanstack/react-query';
import { getMyLikedEvents } from '../../services/apiEventInterests';

export const useEventInterests = (userId) => {
  const {
    isLoading,
    data: likedEvents,
    error,
    refetch,
  } = useQuery({
    queryKey: ['eventInterest', userId],
    queryFn: () => getMyLikedEvents(userId),
    enabled: !!userId,
  });

  const refetchLikedEvents = () => {
    refetch();
  };
  console.log('Liked Events:', likedEvents);

  return { likedEvents, isLoading, error, refetchLikedEvents };
};
