import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllEvents } from '../../services/apiEvents';
import { useSearchParams } from 'react-router-dom';

const useAllEvents = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status') || 'all';

  const sortByRaw = searchParams.get('sortBy') || 'date-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const page = parseInt(searchParams.get('page')) || 1;

  const {
    isLoading,
    data: { data: events, count } = {},
    error,
  } = useQuery({
    queryKey: ['allEvents', status, sortBy, page],
    queryFn: () => getAllEvents({ status, sortBy, page }),
  });

  const pageCount = Math.ceil(count / 10);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['events', status, sortBy, page + 1],
      queryFn: () => getAllEvents({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['events', status, sortBy, page - 1],
      queryFn: () => getAllEvents({ page: page - 1 }),
    });

  return { isLoading, error, events, count };
};

export default useAllEvents;
