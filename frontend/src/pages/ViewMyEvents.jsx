import { Outlet } from 'react-router-dom';

const ViewMyEvents = () => {
  return (
    <main>
      <h1>My Events</h1>
      <Outlet />
    </main>
  );
};

export default ViewMyEvents;
