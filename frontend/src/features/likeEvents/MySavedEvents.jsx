import { Link } from 'react-router-dom';

import { useEventInterests } from './useEventInterests';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Event from '../Event';
import styles from './MySavedEvents.module.css';

const MySavedEvents = () => {
  const { likedEvents, isLoading, error } = useEventInterests();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error fetching events</div>;
  }
  return (
    <main className={styles.container}>
      <h1>My Saved Events ❤️</h1>
      <Link to="mysubmittedevents" className={styles.textWrapper}>
        <p>View My Submitted Events</p>
        <FaLongArrowAltRight />
      </Link>
      <div className={styles.eventsList}>
        {likedEvents?.length > 0 ? (
          likedEvents.map((event) => (
            <Event key={event.event_id} event={event} />
          ))
        ) : (
          <p>No saved events yet.</p>
        )}
      </div>
    </main>
  );
};

export default MySavedEvents;
