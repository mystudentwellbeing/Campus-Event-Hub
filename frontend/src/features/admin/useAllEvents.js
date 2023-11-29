import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllEvents } from '../../services/apiEvents';
import { useSearchParams } from 'react-router-dom';

const useAllEvents = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: events, count } = {},
    error,
  } = useQuery({
    queryKey: ['allEvents', page],
    queryFn: () => getAllEvents({ page }),
  });

  const pageCount = Math.ceil(count / 10);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['events', page + 1],
      queryFn: () => getAllEvents({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['events', page - 1],
      queryFn: () => getAllEvents({ page: page - 1 }),
    });

  return { isLoading, error, events, count };
};

export default useAllEvents;
