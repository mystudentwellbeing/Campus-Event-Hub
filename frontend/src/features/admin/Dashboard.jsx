import { Link } from 'react-router-dom';
import { MdOutlinePendingActions, MdEvent } from 'react-icons/md';
import { RiUserReceived2Line } from 'react-icons/ri';
import { LuUsers } from 'react-icons/lu';
import { GoHeartFill } from 'react-icons/go';
import { FaSchool } from 'react-icons/fa';
import {
  getCurrentMonthDateRange,
  countEventsBySchool,
} from '../../utils/helpers';
import useAllEvents from './useAllEvents';
import usePendingEventsCount from './usePendingEventsCount';
import useUsers from './useUsers';
import useEventLikes from './useEventLikes';
import useCurrentMonthEventsCount from './useCurrentMonthEventsCount';
import StatBox from '../../ui/StatBox';
import Loader from '../../ui/Loader';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { isLoading: isLoading1, events, error1 } = useAllEvents();
  const { isLoading: isLoading2, count, error2 } = usePendingEventsCount();
  const { isLoading: isLoading3, users, error3 } = useUsers();
  const { isLoading: isLoading4, eventLikes, error4 } = useEventLikes();
  const {
    isLoading: isLoading5,
    count: currentMonthEventsCount,
    error: error5,
  } = useCurrentMonthEventsCount();
  const { firstDayOfMonth, lastDayOfMonth } = getCurrentMonthDateRange();
  const now = new Date();

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4 || isLoading5)
    return <Loader />;
  if (error1 || error2 || error3 || error4 || error5) {
    const errorMessage = error1?.message || error2?.message || error3?.message;
    return <div>Error: {errorMessage}</div>;
  }

  const newUsersThisMonth = users?.filter((user) => {
    const userCreatedAt = new Date(user.created_at);
    return userCreatedAt >= firstDayOfMonth && userCreatedAt < now;
  }).length;

  const counts = countEventsBySchool(events);

  const uOfManitobaCount = counts['University_of_Manitoba'] || 0;
  const uOfWinnipegCount = counts['University_of_Winnipeg'] || 0;
  const otherCount = counts['Other'] || 0;

  const getTop3LikedEvents = (eventLikes, events) => {
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
        <StatBox
          IconComponent={MdOutlinePendingActions}
          title="Pending Events"
          count={count}
        />
        <StatBox
          IconComponent={MdEvent}
          title="Events This Month"
          count={currentMonthEventsCount}
        />
        <StatBox
          IconComponent={RiUserReceived2Line}
          title="New Users This Month"
          count={newUsersThisMonth}
        />
        <StatBox
          IconComponent={LuUsers}
          title="Total Number of Users"
          count={users?.length}
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.headerWrapper}>
          <FaSchool className={styles.icon} />
          <h3>NUMBER OF EVENTS BY SCHOOL</h3>
        </div>
        <ul>
          <li>University of Manitoba: {uOfManitobaCount}</li>
          <li>University of Winnipeg: {uOfWinnipegCount}</li>
          <li>Other: {otherCount}</li>
        </ul>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.headerWrapper}>
          <GoHeartFill className={styles.icon} />
          <h3>TOP 3 LIKED EVENTS OF THE MOTNH</h3>
        </div>
        <ul>
          {top3Events.map((event, index) => (
            <Link
              key={index}
              to={`/events/${event.event_id}`}
              className={styles.link}
            >
              <li>
                {event.name}: &nbsp;
                {event.likes} likes
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
