import useEvents from '../hooks/useEvents';
import Event from './Event';
import styles from './EventList.module.css';

const EventList = () => {
  const { filteredEvents } = useEvents();

  return (
    <div className={styles.allevents}>
      {filteredEvents.map((event) => (
        <Event key={event.event_id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
