import { useContext } from 'react';
import { EventsContext } from '../contexts/EventsContext';

const useEvents = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }

  return context;
};

export default useEvents;
