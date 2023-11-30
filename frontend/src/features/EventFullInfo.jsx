import { useNavigate } from 'react-router-dom';
import { useUser } from './../features/authentication/useUser';
import { useEventInterests } from './likeEvents/useEventInterests';
import { useLikeEvent } from './likeEvents/useLikeEvent';
import { useUnlikeEvent } from './likeEvents/useUnlikeEvent';
import { displayPrice, formatEventDate, formatTime } from '../utils/helpers';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FiShare } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import styles from './EventFullInfo.module.css';
import useEvent from './searchEvents/useEvent';

const EventFullInfo = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const { likeEvent } = useLikeEvent();
  const { unlikeEvent } = useUnlikeEvent();
  const { likedEvents, refetchLikedEvents } = useEventInterests(user?.id);
  const { isLoading, event } = useEvent();
  if (isLoading || !event) return <div>Loading...</div>;
  const isLiked = likedEvents?.some(
    (likedEvent) => likedEvent.event_id === event.id
  );
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
          await unlikeEvent(likedEventRecordId);
        }
      } else {
        await likeEvent({ event_id: event.id, user_id: user.id });
      }
      refetchLikedEvents();
    } catch (error) {
      console.error('Error in toggling like:', error);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  return (
    <main className={styles.eventContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={event.image} alt="EventImage" />
      </div>
      <ul>
        <div className={styles.headingContainer}>
          <li className={styles.name}>{event.name}</li>
          <div className={styles.buttonContainer}>
            <div onClick={(e) => toggleLike(e)}>
              {isLiked ? (
                <IoIosHeart className={styles.heartIcon} />
              ) : (
                <IoIosHeartEmpty className={styles.emptyHeartIcon} />
              )}
            </div>
            <FiShare
              className={styles.shareIcon}
              onClick={(e) => handleShare(e)}
            />
          </div>
        </div>
        <li className={styles.shortDesc}>{event.short_description}</li>
        <div className={styles.datePriceContainer}>
          <li className={styles.dateAndTime}>
            {formatEventDate(event.date)} &nbsp;&nbsp;
            <span>
              {event.start_time ? formatTime(event.start_time) : ''} -{' '}
              {event.end_time ? formatTime(event.end_time) : ''}
            </span>
          </li>
          <li className={styles.price}>Price: {displayPrice(event.price)}</li>
        </div>
        <li className={styles.location}>
          Location:
          <br />
          <span>{event.name_of_venue}</span>
          <br />
          <span>{event.address}</span>
          <br />
          <span>{event.city}</span>
          <br />
          <span>{event.postal_code}</span>
        </li>
        <li className={styles.broughtBy}>
          Brought You By
          <br />
          <span>{event.name_of_org}</span>
        </li>

        <li className={styles.descriptionTitle}>Event Description</li>
        <li className={styles.eventDescription}>{event.description}</li>
      </ul>
    </main>
  );
};

export default EventFullInfo;
