import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getEvents } from '../../services/apiEvents';

const useEvents = () => {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const eventCountsByType = events?.reduce((acc, event) => {
    event.type.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {});

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
    eventCountsByType,
  };
};

export default useEvents;
