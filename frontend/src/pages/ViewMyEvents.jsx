import { Outlet } from 'react-router-dom';
import styles from './ViewMyEvents.module.css';

const ViewMyEvents = () => {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  );
};

export default ViewMyEvents;
