import eventsData from '../data/events.json';
import Event from './Event';
import styles from './EventList.module.css';

const events = eventsData.events;

const EventList = () => {
  return (
    <div className={styles.allevents}>
      {events.map((event, index) => (
        <Event
          key={index}
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
