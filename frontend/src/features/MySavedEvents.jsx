import useEvents from '../hooks/useEvents';
import Event from './Event';
import styles from './MySavedEvents.module.css';

const MySavedEvents = () => {
  const { filteredEvents, savedEvents } = useEvents();

  const savedEventsList = filteredEvents.filter(
    (event) => savedEvents[event.event_id]
  );

  return (
    <main className={styles.container}>
      <h1>My Saved Events ❤️</h1>
      <div className={styles.eventsList}>
        {savedEventsList.length > 0 ? (
          savedEventsList.map((event) => (
            <Event key={event.event_id} event={event} />
          ))
        ) : (
          <p>No saved events yet.</p>
        )}
      </div>
    </main>
  );
};

export default MySavedEvents;
