import { useUser } from './../../features/authentication/useUser';
import { useSubmittedEvents } from './useSubmittedEvents';
import Event from '../Event';
import Spinner from '../../ui/SpinnerMini.jsx';
import styles from './MySubmittedEvents.module.css';

const MySubmittedEvents = () => {
  const { user } = useUser();
  const { submittedEvents, isLoading } = useSubmittedEvents(user?.id);

  const myApprovedEvents = submittedEvents?.filter(
    (event) => event.is_approved === true
  );
  const numApprovedEvents = myApprovedEvents?.length;

  const myPendingEvents = submittedEvents?.filter(
    (event) => event.is_approved === false
  );
  const numPendingEvents = myPendingEvents?.length;

  if (isLoading) {
    return <Spinner />;
  }

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
