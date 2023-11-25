// import { useSearchParams } from 'react-router-dom';
import useEvents from './useEvents';
import Event from './Event';
import styles from './EventList.module.css';

const EventList = () => {
  const { isLoading, events, error } = useEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;

  return (
    <div className={styles.allevents}>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
