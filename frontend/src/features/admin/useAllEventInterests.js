import { useQuery } from '@tanstack/react-query';
import { getAllEventInterests } from '../../services/apiEventInterests';

export const useAllEventInterests = () => {
  const {
    isLoading,
    data: allEventInterests,
    error,
  } = useQuery({
    queryKey: ['AllEventInterests'],
    queryFn: () => getAllEventInterests(),
  });

  console.log(allEventInterests);
  return { allEventInterests, isLoading, error };
};
