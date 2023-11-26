import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './../features/authentication/useUser';
import { useLikeEvent } from './likeEvents/useLikeEvent';
import { useUnlikeEvent } from './likeEvents/useUnlikeEvent';
import { useEventInterests } from './likeEvents/useEventInterests';
import { displayPrice, formatEventDate, formatTime } from '../utils/helpers';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

import styles from './Event.module.css';

const Event = ({ event }) => {
  const { isAuthenticated, user } = useUser();
  const { likeEvent } = useLikeEvent();
  const { unlikeEvent } = useUnlikeEvent();
  const { likedEvents, refetchLikedEvents } = useEventInterests(user?.id);
  const navigate = useNavigate();

  const isLiked = likedEvents?.some(
    (likedEvent) => likedEvent.event_id === event.id
  );

  const isCreator = user?.id === event.user_id;

  const toggleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const likedEventRecord = likedEvents?.find(
      (le) => le.event_id === event.id
    );

    try {
      if (isLiked) {
        const likedEventRecordId = likedEventRecord?.id;
        if (likedEventRecordId) {
          unlikeEvent(likedEventRecordId);
        }
      } else {
        likeEvent({ event_id: event.id, user_id: user.id });
      }
      refetchLikedEvents();
    } catch (error) {
      console.error('Error in toggling like:', error);
    }
  };

  return (
    <Link to={`/events/${event.id}`} className={styles.eventCard}>
      {isCreator && (
        <div className={styles.overlayButtons}>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
      <div className={styles.event}>
        <img className={styles.eventImage} src={event.image} alt="EventImage" />
        <div className={styles.eventHeader}>
          <h4>{event.name}</h4>
          <div className={styles.headerRightSide}>
            <h3>{displayPrice(event.price)}</h3>
            <div onClick={(e) => toggleLike(e)}>
              {isLiked ? (
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
        <p className={styles.shortDesc}>{event.short_description}</p>
      </div>
    </Link>
  );
};

export default Event;
