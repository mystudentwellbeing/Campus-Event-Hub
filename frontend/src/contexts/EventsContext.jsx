import { useState, createContext } from 'react';
import eventsData from '../data/events.json';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const events = eventsData.events;

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  const filteredEvents = events
    .filter((event) => {
      const matchesQuery =
        !query ||
        event.name_of_event.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.type.toLowerCase().includes(query.toLowerCase());
      if (filters.length === 0) return matchesQuery;

      const eventTypes = event.type
        .split(',')
        .map((type) => type.trim().toUpperCase());
      const matchesFilter = filters.some((filter) =>
        eventTypes.includes(filter.toUpperCase())
      );

      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <EventsContext.Provider
      value={{ filteredEvents, query, setQuery, filters, setFilters }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
