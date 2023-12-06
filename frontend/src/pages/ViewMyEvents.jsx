import { Outlet } from 'react-router-dom';
import styles from './ViewMyEvents.module.css';

const ViewMyEvents = () => {
  return (
    <main className={styles.container}>
      <h1>My Events</h1>
      <Outlet />
    </main>
  );
};

export default ViewMyEvents;
