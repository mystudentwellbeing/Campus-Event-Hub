import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllEvents } from '../../services/apiEvents';

const useAllEvents = () => {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['allEvents'],
    queryFn: getAllEvents,
  });

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filteredEvents = useMemo(() => {
    const filterValues = searchParams.get('filters')?.split(',') || [];
    return events?.filter((event) => {
      const matchesSearch = searchQuery
        ? event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.format?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.name_of_inst
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          event.type.some((type) =>
            type.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;
      const matchesFilter =
        filterValues.length === 0
          ? true
          : filterValues.some((filter) => event.type.includes(filter));
      return matchesSearch && matchesFilter;
    });
  }, [events, searchQuery, searchParams]);

  return {
    isLoading,
    error,
    events: filteredEvents,
  };
};

export default useAllEvents;
