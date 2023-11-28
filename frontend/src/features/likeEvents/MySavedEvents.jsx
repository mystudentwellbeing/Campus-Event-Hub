import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useUser } from './../../features/authentication/useUser';
import { useEventInterests } from './useEventInterests';
import useEvents from './../../features/searchEvents/useEvents';
import Event from '../Event';
import Loader from '../../ui/Loader';
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
    return <Loader />;
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
