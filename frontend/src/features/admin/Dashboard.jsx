import useAllEvents from './useAllEvents';
import useUsers from './useUsers';
import { useAllEventInterests } from './useAllEventInterests';

const Dashboard = () => {
  const { isLoading1, events, error1 } = useAllEvents();
  const { isLoading2, users, error2 } = useUsers();
  const { isLoading3, allEventInterests, error3 } = useAllEventInterests();

  if (isLoading1 || isLoading2 || isLoading3) return <div>Loading...</div>;
  if (error1 || error2 || error3) {
    const errorMessage = error1?.message || error2?.message || error3?.message;
    return <div>Error: {errorMessage}</div>;
  }

  console.log(allEventInterests);

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

  const getTop3LikedEvents = (allEventInterests) => {
    const likeCounts = {};

    // Count likes for each event
    allEventInterests.forEach((event) => {
      if (likeCounts[event.event_id]) {
        likeCounts[event.event_id] += 1;
      } else {
        likeCounts[event.event_id] = 1;
      }
    });

    // Create an array from the likeCounts object and sort it by like count
    const sortedEvents = Object.keys(likeCounts)
      .map((event_id) => {
        return { event_id: parseInt(event_id), likes: likeCounts[event_id] };
      })
      .sort((a, b) => b.likes - a.likes); // Sort in descending order of likes

    // Get the top 3 events
    return sortedEvents.slice(0, 3);
  };

  const top3Events = allEventInterests
    ? getTop3LikedEvents(allEventInterests)
    : [];
  console.log(top3Events);

  return (
    <div>
      <div>PENDING EVENTS:{pendingEvents?.length}</div>
      <div>EVENTS THIS MONTH:{eventsThisMonth?.length}</div>
      <div>NEW USERS THIS MONTH:{newUsersThisMonth}</div>
      <div>TOTAL NUMBER OF USERS:{users?.length}</div>
      <div>
        <h3>TOP 3 EVENTS OF THE MOTNH</h3>
        <ul>
          {top3Events.map((event, index) => (
            <li key={index}>
              Event ID: {event.event_id}, Likes: {event.likes}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>NUMBER OF EVENTS BY SCHOOL</h3>
      </div>
      <div>
        <p>University of Manitoba:{uOfManitobaCount}</p>
        <p>University of Winnipeg:{uOfWinnipegCount}</p>
        <p>Other:{otherCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;
