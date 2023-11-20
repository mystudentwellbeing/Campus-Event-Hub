import styles from './Event.module.css';

const Event = ({ event }) => {
  return (
    <div className={styles.event}>
      <img
        className={styles.eventImage}
        src={event.image_url}
        alt="EventImage"
      />
      <div className={styles.eventHeader}>
        <h4>{event.name_of_event}</h4>
        <h3>{event.price} &nbsp; Like</h3>
      </div>
      <p>
        {event.date} and {event.time}
      </p>
      <p className={styles.eventType}>{event.type}</p>
      <p>{event.short_description}</p>
    </div>
  );
};

export default Event;
