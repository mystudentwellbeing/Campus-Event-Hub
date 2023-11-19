// import { useAuth } from "../../contexts/AuthContext";
import NotLoggedInNav from './NotLoggedInNav';
// import LoggedInNav from "./LoggedInNav";
import styles from './Navbar.module.css';

const Navbar = () => {
  // const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.navBar}>
      {/* {isAuthenticated ? <LoggedInNav /> : <NotLoggedInNav />} */}
      <NotLoggedInNav />
    </nav>
  );
};

export default Navbar;
