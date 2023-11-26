import { formatEventDate } from '../utils/helpers';
import styles from './EventFullInfo.module.css';
import useEvent from './searchEvents/useEvent';

const EventFullInfo = () => {
  const { isLoading, event } = useEvent();
  if (isLoading || !event) return <div>Loading...</div>;

  return (
    <main className={styles.container}>
      <div className={styles.event}>
        <img
          className={styles.eventImage}
          src={event.image_url}
          alt="EventImage"
        />
      </div>

      <h2 className={styles.name_of_event}>{event.name}</h2>
      <p>{event.short_description}</p>
      <p className={styles.dateAndTime}>
        Date and Time: {formatEventDate(event.date)} | Price: {event.price}
      </p>
      <p className={styles.location}>
        Location:
        <br />
        <span>{event.name_of_venue}</span>
        <br />
        <span>{event.address}</span>
        <br />
        <span>{event.city}</span>
        <br />
        <span>{event.postal_code}</span>
      </p>
      <p className={styles.broughtBy}>
        Brought You By
        <br />
        <span>{event.name_organization}</span>
      </p>

      <p className={styles.descriptionTitle}>Event Description</p>
      <div className={styles.eventDescription}>{event.description}</div>
    </main>
  );
};

export default EventFullInfo;
