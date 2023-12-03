import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './../features/authentication/useUser';
import { useEventInterests } from './likeEvents/useEventInterests';
import { useLikeEvent } from './likeEvents/useLikeEvent';
import { useUnlikeEvent } from './likeEvents/useUnlikeEvent';
import { displayPrice, formatEventDate, formatTime } from '../utils/helpers';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import Modal from '../ui/Modal';
import DeleteAlert from '../ui/DeleteAlert';
import Button from '../ui/Button';
import styles from './Event.module.css';

const Event = ({ event }) => {
  const { isAuthenticated, user, isAdmin } = useUser();
  const { likeEvent } = useLikeEvent();
  const { unlikeEvent } = useUnlikeEvent();
  const { likedEvents, refetchLikedEvents } = useEventInterests(user?.id);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/submitevents', { state: { event } });
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className={styles.eventCard}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {(isCreator || isAdmin) && isHovering && (
        <div className={styles.overlayButtons}>
          <Button type="hoverBtn" onClick={handleEdit}>
            Edit
          </Button>
          <Button type="hoverBtn" onClick={handleDeleteClick}>
            Delete
          </Button>
          {isModalOpen && (
            <Modal title="Delete Event" onClose={() => setModalOpen(false)}>
              <DeleteAlert
                eventId={event.id}
                onCloseModal={() => setModalOpen(false)}
              />
            </Modal>
          )}
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
          {event.date ? formatEventDate(event.date) : 'Date not available'}{' '}
          &nbsp;&nbsp;
          {event.start_time ? formatTime(event.start_time) : ''} -{' '}
          {event.end_time ? formatTime(event.end_time) : ''}
        </p>
        <p id={styles.eventType}>{event.type?.join(', ')}</p>
        <p className={styles.shortDesc}>{event.short_description}</p>
      </div>
    </Link>
  );
};

export default Event;
