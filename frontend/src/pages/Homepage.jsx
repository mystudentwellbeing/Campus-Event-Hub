import { Outlet } from 'react-router-dom';
import EventOperations from '../features/searchEvents/EventOperations';

const Homepage = () => {
  return (
    <main>
      <EventOperations />
      <Outlet />
    </main>
  );
};

export default Homepage;
