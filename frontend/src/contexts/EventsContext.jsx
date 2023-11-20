import { useState, createContext } from 'react';
import eventsData from '../data/events.json';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const events = eventsData.events;

  const [query, setQuery] = useState('');
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  const filteredEvents = (
    query
      ? events.filter(
          (event) =>
            event.name_of_event.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase()) ||
            event.type.toLowerCase().includes(query.toLowerCase())
        )
      : events
  ).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <EventsContext.Provider value={{ filteredEvents, query, setQuery }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
