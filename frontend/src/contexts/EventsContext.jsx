import { useState, createContext } from 'react';
import eventsData from '../data/events.json';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const events = eventsData.events;

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  const filteredEvents = events
    .filter((event) => {
      const matchesQuery =
        !query ||
        event.name_of_event.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.type.toLowerCase().includes(query.toLowerCase());
      const eventTypes = event.type
        .split(',')
        .map((type) => type.trim().toUpperCase());
      const matchesFilter = filter
        ? eventTypes.includes(filter.toUpperCase())
        : true;
      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <EventsContext.Provider
      value={{ filteredEvents, query, setQuery, setFilter }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
