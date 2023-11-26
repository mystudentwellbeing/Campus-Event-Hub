import { Link } from 'react-router-dom';
import { useUser } from './../../features/authentication/useUser';
import useEvents from './../../features/searchEvents/useEvents';
import { useEventInterests } from './useEventInterests';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Event from '../Event';
import styles from './MySavedEvents.module.css';

const MySavedEvents = () => {
  const { user } = useUser();
  const {
    events,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useEvents();
  const { likedEvents } = useEventInterests(user?.id);

  const myLikedEvents = likedEvents?.map((likedEvent) =>
    events.find((event) => event.id === likedEvent.event_id)
  );

  if (isEventsLoading) {
    return <div>Loading events...</div>;
  }

  if (eventsError) {
    console.error(eventsError);
    return <div>Error fetching my event details</div>;
  }

  return (
    <main className={styles.container}>
      <h1>My Saved Events ❤️</h1>
      <Link to="mysubmittedevents" className={styles.textWrapper}>
        <p>View My Submitted Events</p>
        <FaLongArrowAltRight />
      </Link>
      <div className={styles.eventsList}>
        {myLikedEvents && myLikedEvents.length > 0 ? (
          myLikedEvents.map((event) => <Event key={event.id} event={event} />)
        ) : (
          <p>No saved events yet.</p>
        )}
      </div>
    </main>
  );
};

export default MySavedEvents;
