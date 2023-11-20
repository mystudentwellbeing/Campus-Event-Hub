import useEvents from '../hooks/useEvents';
import Event from './Event';
import styles from './EventList.module.css';

const EventList = () => {
  const { filteredEvents } = useEvents();

  return (
    <div className={styles.allevents}>
      {filteredEvents.map((event) => (
        <Event
          key={event.event_id}
          image_url={event.image_url}
          name_of_event={event.name_of_event}
          price={event.price}
          date={event.date}
          time={event.time}
          type={event.type}
          short_description={event.short_description}
        />
      ))}
    </div>
  );
};

export default EventList;
