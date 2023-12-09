import { useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FiShare } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useUser } from './authentication/useUser';
import { useEventInterests } from './likeEvents/useEventInterests';
import { useLikeEvent } from './likeEvents/useLikeEvent';
import { useUnlikeEvent } from './likeEvents/useUnlikeEvent';
import useEvent from './searchEvents/useEvent';
import {
  displayPrice,
  formatEventDate,
  formatTime,
  formatInstitutionName,
} from '../utils/helpers';
import styles from './EventFullInfoContent.module.css';

const EventFullInfoContent = () => {
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

  // const handleShare = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   navigator.clipboard.writeText(window.location.href);
  //   toast.success('Link copied to clipboard');
  // };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const urlToCopy = window.location.href;

    // Check if ClipboardItem is supported
    if (
      typeof ClipboardItem !== 'undefined' &&
      navigator.clipboard &&
      navigator.clipboard.write
    ) {
      const textBlob = new Blob([urlToCopy], { type: 'text/plain' });
      const clipboardItem = new ClipboardItem({ 'text/plain': textBlob });
      try {
        await navigator.clipboard.write([clipboardItem]);
        toast.success('Link copied to clipboard');
      } catch (error) {
        console.error('Clipboard API error:', error);
        toast.error('Failed to copy the link');
      }
    } else {
      // Fallback for browsers like Firefox without ClipboardItem support
      try {
        await navigator.clipboard.writeText(urlToCopy);
        toast.success('Link copied to clipboard');
      } catch (error) {
        console.error('Clipboard writeText error:', error);
        toast.error('Failed to copy the link');
      }
    }
  };

  return (
    <div className={styles.eventContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={event.image} alt="EventImage" />
      </div>

      <div className={styles.headingContainer}>
        <h3 className={styles.name}>{event.name}</h3>
        <div className={styles.buttonWrapper}>
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
      <ul className={styles.listContainer}>
        <li className={styles.shortDesc}>{event.short_description}</li>
        <div className={styles.dateEventFormatContainer}>
          <li className={styles.dateAndTime}>
            {formatEventDate(event.date)} &nbsp;&nbsp;
            <span>
              {event.start_time ? formatTime(event.start_time) : ''} -{' '}
              {event.end_time ? formatTime(event.end_time) : ''}
            </span>
          </li>
          <li className={styles.format}>{event.event_format}</li>
        </div>
        <li className={styles.price}>Price: {displayPrice(event.price)}</li>
        <li>
          <p className={styles.location}>Location:</p>
          <p className={styles.locationInfo}>{event.name_of_venue}</p>
          <p className={styles.locationInfo}>{event.address}</p>
          <p className={styles.locationInfo}>{event.city}</p>
          <p className={styles.locationInfo}>{event.postal_code}</p>
        </li>
        <li>
          <span className={styles.broughtBy}>Brought You By:&nbsp;</span>
          <span className={styles.organization}>{event.name_of_org}&nbsp;</span>
          <span className={styles.institution}>
            {formatInstitutionName(event.name_of_inst)}
          </span>
        </li>
        <li className={styles.descriptionTitle}>Event Description</li>
        <li className={styles.eventDescription}>{event.description}</li>
      </ul>
    </div>
  );
};

export default EventFullInfoContent;
