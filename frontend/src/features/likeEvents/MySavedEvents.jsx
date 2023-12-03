import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useUser } from './../../features/authentication/useUser';
import { useEventInterests } from './useEventInterests';
import Event from '../Event';
import Loader from '../../ui/Loader';
import styles from './MySavedEvents.module.css';

const MySavedEvents = () => {
  const { user } = useUser();
  const {
    likedEvents,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useEventInterests(user?.id);

  if (isEventsLoading) {
    return <Loader />;
  }

  if (eventsError) {
    console.error(eventsError);
    return <div>Error fetching my event details</div>;
  }

  return (
    <div className={styles.savedEventsContainer}>
      <h1>My Saved Events ({likedEvents.length})</h1>
      <Link to="/viewmyevents/mysubmittedevents" className={styles.textWrapper}>
        <p>View My Submitted Events</p>
        <FaLongArrowAltRight />
      </Link>
      <div className={styles.eventsList}>
        {likedEvents && likedEvents.length > 0 ? (
          likedEvents.map((likedEvent) => (
            <Event key={likedEvent.event_id} event={likedEvent.events} />
          ))
        ) : (
          <p>No saved events yet.</p>
        )}
      </div>
    </div>
  );
};

export default MySavedEvents;
