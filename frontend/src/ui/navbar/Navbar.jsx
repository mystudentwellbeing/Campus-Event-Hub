import { useUser } from '../../features/authentication/useUser';
import NotLoggedInNav from './NotLoggedInNav';
import LoggedInNav from './LoggedInNav';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated } = useUser();

  return (
    <nav className={styles.navBar}>
      {isAuthenticated ? <LoggedInNav /> : <NotLoggedInNav />}
    </nav>
  );
};

export default Navbar;
