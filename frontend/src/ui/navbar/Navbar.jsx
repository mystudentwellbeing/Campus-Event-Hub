import { useUser } from '../../features/authentication/useUser';
import NotLoggedInNav from './NotLoggedInNav';
import LoggedInNav from './LoggedInNav';
import AdminNav from './AdminNav';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin } = useUser();

  return (
    <nav className={styles.navBar}>
      {isAuthenticated && isAdmin ? (
        <AdminNav />
      ) : isAuthenticated ? (
        <LoggedInNav />
      ) : (
        <NotLoggedInNav />
      )}
    </nav>
  );
};

export default Navbar;
