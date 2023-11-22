import useAuth from '../../hooks/useAuth';
import NotLoggedInNav from './NotLoggedInNav';
import LoggedInNav from './LoggedInNav';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.navBar}>
      {isAuthenticated ? <LoggedInNav /> : <NotLoggedInNav />}
    </nav>
  );
};

export default Navbar;
