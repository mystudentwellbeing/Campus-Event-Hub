import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from './../services/apiEvents';

const useEvents = () => {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  // Filter state
  const [filters, setFilters] = useState([]);

  const eventCountsByType = events
    ? events.reduce((acc, event) => {
        // Loop over each type in the event's type array
        event.type.forEach((type) => {
          // Initialize if not already present
          if (!acc[type]) {
            acc[type] = 0;
          }
          // Increment the count for this type
          acc[type] += 1;
        });
        return acc;
      }, {})
    : {};

  // Filtered events based on active filters
  const filteredEvents = events?.filter(
    (event) =>
      filters.length === 0 || event.type.some((type) => filters.includes(type))
  );
  console.log('filtered events', filteredEvents);
  return {
    isLoading,
    error,
    events: filteredEvents,
    setFilters,
    filters,
    eventCountsByType,
  };
};

export default useEvents;
