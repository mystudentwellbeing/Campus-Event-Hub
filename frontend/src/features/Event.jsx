import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import styles from './Event.module.css';

const Event = ({ event }) => {
  const { likedEvents, toggleLike } = useEvents();

  const isLiked = likedEvents[event.event_id];

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(event.event_id);
  };

  const displayPrice = (price) => {
    if (price.toLowerCase() === 'free' || price === '0') {
      return 'Free';
    } else if (price.startsWith('$')) {
      return '$';
    }
    return price;
  };

  const formatEventDate = (date) => {
    const dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleDateString(
      'en-US',
      dateOptions
    );

    return formattedDate;
  };

  return (
    <Link to={`/events/${event.event_id}`} className={styles.eventCard}>
      <div className={styles.event}>
        <img
          className={styles.eventImage}
          src={event.image_url}
          alt="EventImage"
        />
        <div className={styles.eventHeader}>
          <h4>{event.name_of_event}</h4>
          <div className={styles.headerRightSide}>
            <h3>{displayPrice(event.price)}</h3>
            <div onClick={handleToggleLike}>
              {isLiked ? (
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
        <p>{event.short_description}</p>
      </div>
    </Link>
  );
};

export default Event;
