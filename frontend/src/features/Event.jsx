import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import { displayPrice, formatEventDate, formatTime } from '../utils/helpers';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

import styles from './Event.module.css';

const Event = ({ event }) => {
  const { savedEvents, toggleSave } = useEvents();

  const isSaved = savedEvents[event.event_id];

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(event.event_id);
  };

  return (
    <Link to={`/events/${event.id}`} className={styles.eventCard}>
      <div className={styles.event}>
        <img
          className={styles.eventImage}
          src={event.image_url}
          alt="EventImage"
        />
        <div className={styles.eventHeader}>
          <h4>{event.name}</h4>
          <div className={styles.headerRightSide}>
            <h3>{displayPrice(event.price)}</h3>
            <div onClick={handleToggleSave}>
              {isSaved ? (
                <IoIosHeart className={styles.heartIcon} />
              ) : (
                <IoIosHeartEmpty className={styles.emptyHeartIcon} />
              )}
            </div>
          </div>
        </div>
        <p>
          {formatEventDate(event.date)} &nbsp;&nbsp;{' '}
          {formatTime(event.start_time)} - {formatTime(event.end_time)}
        </p>
        <p className={styles.eventType}>{event.type.join(',  ')}</p>
        <p>{event.name}</p>
      </div>
    </Link>
  );
};

export default Event;
