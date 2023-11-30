import { MdOutlinePendingActions } from 'react-icons/md';
import { MdEvent } from 'react-icons/md';
import { RiUserReceived2Line } from 'react-icons/ri';
import { LuUsers } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa';
import { FaSchool } from 'react-icons/fa';
import useAllEvents from './useAllEvents';
import useUsers from './useUsers';
import useEventLikes from './useEventLikes';
import Loader from '../../ui/Loader';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { isLoading: isLoading1, events, error1 } = useAllEvents();
  const { isLoading: isLoading2, users, error2 } = useUsers();
  const { isLoading: isLoading3, eventLikes, error3 } = useEventLikes();

  if (isLoading1 || isLoading2 || isLoading3) return <Loader />;
  if (error1 || error2 || error3) {
    const errorMessage = error1?.message || error2?.message || error3?.message;
    return <div>Error: {errorMessage}</div>;
  }

  const pendingEvents = events?.filter((event) => event.is_approved === false);
  const eventsThisMonth = events?.filter((event) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const approved = event.is_approved === true;
    return (
      new Date(event.date) >= firstDayOfMonth &&
      new Date(event.date) < now &&
      approved
    );
  });

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const newUsersThisMonth =
    users?.filter((user) => {
      const userCreatedAt = new Date(user.created_at);
      return userCreatedAt >= firstDayOfMonth && userCreatedAt < now;
    }).length - 1;

  const counts = events
    ? events.reduce((acc, event) => {
        const uni = event.name_of_inst || 'Other';
        acc[uni] = (acc[uni] || 0) + 1;
        return acc;
      }, {})
    : {};

  const uOfManitobaCount = counts['University_of_Manitoba'] || 0;
  const uOfWinnipegCount = counts['University_of_Winnipeg'] || 0;
  const otherCount = counts['Other'] || 0;

  const getTop3LikedEvents = (eventLikes, events) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const likeCounts = {};
    eventLikes.forEach((eventLike) => {
      const event = events.find((e) => e.id === eventLike.event_id);
      if (event) {
        const eventDate = new Date(event.date);
        if (eventDate >= firstDayOfMonth && eventDate <= lastDayOfMonth) {
          likeCounts[eventLike.event_id] =
            (likeCounts[eventLike.event_id] || 0) + 1;
        }
      }
    });

    const sortedEvents = Object.keys(likeCounts)
      .map((event_id) => ({
        event_id: parseInt(event_id),
        likes: likeCounts[event_id],
      }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);

    // Add event names to the top 3 events
    return sortedEvents.map((event) => {
      const eventDetail = events.find((e) => e.id === event.event_id);
      return {
        ...event,
        name: eventDetail ? eventDetail.name : 'Unknown Event',
      };
    });
  };

  const top3Events = eventLikes ? getTop3LikedEvents(eventLikes, events) : [];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topContainer}>
        <div className={styles.numOfPendingEvents}>
          <MdOutlinePendingActions className={styles.icon} />
          <div className={styles.statWrapper}>
            <h4>PENDING EVENTS</h4>
            <p>{pendingEvents?.length}</p>
          </div>
        </div>
        <div className={styles.numOfEvents}>
          <MdEvent className={styles.icon} />
          <div className={styles.statWrapper}>
            <h4>EVENTS THIS MONTH</h4>
            <p>{eventsThisMonth?.length}</p>
          </div>
        </div>
        <div className={styles.numOfNewUsers}>
          <RiUserReceived2Line className={styles.icon} />
          <div className={styles.statWrapper}>
            <h4>NEW USERS THIS MONTH</h4>
            <p>{newUsersThisMonth}</p>
          </div>
        </div>
        <div className={styles.numOfTotalUsers}>
          <LuUsers className={styles.icon} />
          <div className={styles.statWrapper}>
            <h4>TOTAL NUMBER OF USERS</h4>
            <p>{users?.length}</p>
          </div>
        </div>
      </div>

      <div className={styles.eventsContainer}>
        <div className={styles.headerWrapper}>
          <FaHeart className={styles.icon} />
          <h3>TOP 3 EVENTS OF THE MOTNH</h3>
        </div>
        <ul>
          {top3Events.map((event, index) => (
            <li key={index}>
              Event ID: {event.event_id}, Name: {event.name}, Likes:
              {event.likes}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.schoolContiner}>
        <div className={styles.headerWrapper}>
          <FaSchool className={styles.icon} />
          <h3>NUMBER OF EVENTS BY SCHOOL</h3>
        </div>
        <ul>
          <li>University of Manitoba:{uOfManitobaCount}</li>
          <li>University of Winnipeg:{uOfWinnipegCount}</li>
          <li>Other:{otherCount}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
