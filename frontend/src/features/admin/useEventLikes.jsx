import { useQuery } from '@tanstack/react-query';
import { getEventLikes } from '../../services/apiEventInterests';

export const useEventLikes = () => {
  const {
    isLoading,
    data: eventLikes,
    error,
  } = useQuery({
    queryKey: ['eventLikes'],
    queryFn: () => getEventLikes(),
  });

  return { eventLikes, isLoading, error };
};

export default useEventLikes;
