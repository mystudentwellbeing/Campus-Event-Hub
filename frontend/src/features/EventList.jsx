// import useEvents from '../hooks/useEvents';
import Event from './Event';
import styles from './EventList.module.css';
import useEvents from './useEvents';

const EventList = () => {
  // const { filteredEvents } = useEvents();
  const { isLoading, events } = useEvents();
  console.log(events);
  if (isLoading) return <div>Loading...</div>;

  return (
    // <div className={styles.allevents}>
    //   {filteredEvents.map((event) => (
    //     <Event key={event.event_id} event={event} />
    //   ))}
    // </div>
    <div className={styles.allevents}>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
