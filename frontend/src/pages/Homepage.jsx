import { Outlet } from 'react-router-dom';
import Search from '../features/Search';
import Filter from '../features/Filter';
import styles from './Homepage.module.css';

const Homepage = () => {
  return (
    <main className={styles.homepage}>
      <Search />
      <Filter />
      <Outlet />
    </main>
  );
};

export default Homepage;
