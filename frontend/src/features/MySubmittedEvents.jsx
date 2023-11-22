import useEvents from '../hooks/useEvents';
import Event from './Event';
import styles from './MySubmittedEvents.module.css';

const MySubmittedEvents = () => {
  const { myApprovedEvents, myPendingEvents } = useEvents();

  const numApprovedEvents = myApprovedEvents.length;
  const numPendingEvents = myPendingEvents.length;

  return (
    <main className={styles.container}>
      <h1>My Submitted Events</h1>
      <div className={styles.sectionContainer}>
        <section className={styles.status}>
          <h2>Approved Events ({numApprovedEvents})</h2>
          {myApprovedEvents.map((event) => (
            <Event key={event.event_id} event={event} />
          ))}
        </section>
        <section className={styles.status}>
          <h2>Pending Events({numPendingEvents})</h2>
          {myPendingEvents.map((event) => (
            <Event key={event.event_id} event={event} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default MySubmittedEvents;
