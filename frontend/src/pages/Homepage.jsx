import { Outlet } from 'react-router-dom';
import EventOperations from '../features/searchEvents/EventOperations';
import styles from './Homepage.module.css';

const Homepage = () => {
  return (
    <main className={styles.homepage}>
      <EventOperations />
      <Outlet />
    </main>
  );
};

export default Homepage;
