import useEvents from '../hooks/useEvents';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoIosHeart } from 'react-icons/io';
import styles from './Event.module.css';

const Event = ({ event }) => {
  const { likedEvents, toggleLike } = useEvents();

  const isLiked = likedEvents[event.event_id];

  const handleToggleLike = () => {
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

  return (
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
        {event.date} and {event.time}
      </p>
      <p className={styles.eventType}>{event.type}</p>
      <p>{event.short_description}</p>
    </div>
  );
};

export default Event;
