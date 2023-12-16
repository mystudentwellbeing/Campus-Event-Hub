import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthEventsCount } from '../../services/apiEvents';

const useCurrentMonthEventsCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currentMonthEventsCount'],
    queryFn: getCurrentMonthEventsCount,
  });

  return {
    count: data,
    isLoading,
    error,
  };
};

export default useCurrentMonthEventsCount;
