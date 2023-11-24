import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
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

  const displayPrice = (price) => {
    if (price === 0) {
      return 'Free';
    } else {
      return '$';
    }
  };

  const formatEventDate = (date) => {
    const dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
      'en-US',
      dateOptions
    );

    return formattedDate;
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
          {formatEventDate(event.date)} &nbsp;&nbsp; {event.startTime} -{' '}
          {event.endTime}
        </p>
        <p className={styles.eventType}>{event.type}</p>
        <p>{event.name}</p>
      </div>
    </Link>
  );
};

export default Event;
