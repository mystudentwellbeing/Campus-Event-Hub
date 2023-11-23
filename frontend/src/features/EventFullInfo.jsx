import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useEvents from '../hooks/useEvents';
import styles from './EventFullInfo.module.css';

const EventFullInfo = () => {
  const { id } = useParams();
  const { currentEvent, getEventById } = useEvents();

  useEffect(() => {
    getEventById(id);
  }, [id, getEventById]);

  if (!currentEvent) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className={styles.container}>
      <div className={styles.event}>
        <img
          className={styles.eventImage}
          src={currentEvent.image_url}
          alt="EventImage"
        />
      </div>

      <h2 className={styles.name_of_event}>{currentEvent.name_of_event}</h2>
	<p>{currentEvent.short_description}</p>
      <p className={styles.dateAndTime}>Date and Time: {currentEvent.date} | Price: {currentEvent.price}</p>
      <p className={styles.location}>
        Location:<br />
        <span>{currentEvent.name_of_venue}</span><br />
        <span>{currentEvent.address}</span><br />
        <span>{currentEvent.city}</span><br />
        <span>{currentEvent.postal_code}</span>
      </p>
      <p className={styles.broughtBy}>
        Brought You By<br />
        <span>{currentEvent.name_organization}</span>
      </p>
      <p className={styles.descriptionTitle}>Event Description</p>
      <p>{currentEvent.description}</p>
      {currentEvent.event_link && <p className={styles.link}>Link: {currentEvent.event_link}</p>}
    </main>
  );
};

export default EventFullInfo;