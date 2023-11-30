import EventOperations from '../features/searchEvents/EventOperations';
import EventList from '../features/searchEvents/EventList';
const Homepage = () => {
  return (
    <main>
      <EventOperations />
      <EventList />
    </main>
  );
};

export default Homepage;
