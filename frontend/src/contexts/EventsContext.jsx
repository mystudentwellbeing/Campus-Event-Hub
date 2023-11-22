import { useState, createContext, useMemo } from 'react';
import eventsData from '../data/events.json';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const events = eventsData.events;

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [savedEvents, setSavedEvents] = useState({});
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  const filteredEvents = events
    .filter((event) => {
      // Check if the event is approved
      const isApproved = event.is_approved === 1;

      // Check if the event has not expired
      const eventDate = new Date(event.date + 'T00:00:00');
      const currentDate = new Date();
      const startOfCurrentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const isNotExpired = eventDate >= startOfCurrentDate;
      return isApproved && isNotExpired;
    })
    .filter((event) => {
      // Check if the event matches the query
      const matchesQuery =
        !query ||
        event.name_of_event.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.type.toLowerCase().includes(query.toLowerCase());
      if (filters.length === 0) return matchesQuery;

      // Check if the event matches any of the filters
      const eventTypes = event.type
        .split(',')
        .map((type) => type.trim().toUpperCase());
      const matchesFilter = filters.some((filter) =>
        eventTypes.includes(filter.toUpperCase())
      );

      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const eventCountsByType = useMemo(() => {
    const counts = {};
    filteredEvents.forEach((event) => {
      event.type.split(',').forEach((type) => {
        const trimmedType = type.trim().toUpperCase();
        counts[trimmedType] = (counts[trimmedType] || 0) + 1;
      });
    });
    return counts;
  }, [filteredEvents]);

  const getEventById = (id) => {
    const foundEvent = events.find((event) => event.event_id === id);
    setCurrentEvent(foundEvent);
  };

  const toggleSave = (eventId) => {
    setSavedEvents((prevSavedEvents) => ({
      ...prevSavedEvents,
      [eventId]: !prevSavedEvents[eventId],
    }));
  };

  return (
    <EventsContext.Provider
      value={{
        eventCountsByType,
        filteredEvents,
        query,
        setQuery,
        filters,
        setFilters,
        getEventById,
        currentEvent,
        savedEvents,
        toggleSave,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
