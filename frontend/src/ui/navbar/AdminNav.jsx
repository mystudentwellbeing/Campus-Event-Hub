import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../features/authentication/useLogout';
import Hamburger from 'hamburger-react';
import useOutsideClick from '../../hooks/useOutsideClickforNav';
import Button from '../Button';
import SpinnerMini from '../SpinnerMini';
import logo from '../../assets/logo.png';
import styles from './NotLoggedInNav.module.css';

const AdminNav = () => {
  const [isHambugerOpen, setHamburgerOpen] = useState(false);

  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);

  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when user lands on a new page
  const closeMenu = () => {
    setHamburgerOpen(false);
  };

  // Close dropdown when user clicks outside of dropdown
  useOutsideClick(hamburgerRef, dropdownRef, closeMenu);

  // Close dropdown when the window is resized to a larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setHamburgerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.navBarContainer}>
      <Link to="/">
        <img src={logo} alt="my student wellbeing logo" />
      </Link>
      {/* <Link to="/">
        <h2>Event Hub</h2>
      </Link> */}
      <a
        href="https://mystudentwellbeing.ca/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={styles.menuButton}>Mental Health Counselling</button>
      </a>
      <ul
        ref={dropdownRef}
        className={isHambugerOpen ? styles.navMenuDropdown : styles.navMenu}
      >
        <div className={styles.menuWrapper}>
          <li>
            <Link to="/admin/dashboard" onClick={closeMenu}>
              DASHBOARD
            </Link>
          </li>
          <li>
            <Link to="/admin/events" onClick={closeMenu}>
              EVENT MANAGEMENT
            </Link>
          </li>
          <li>
            <Link to="/submitevents" onClick={closeMenu}>
              SUBMIT EVENTS
            </Link>
          </li>
          <li>
            <Link to="/viewmyevents" onClick={closeMenu}>
              VIEW MY EVENTS
            </Link>
          </li>

          <li>
            <Link to="/setting" onClick={closeMenu}>
              SETTING
            </Link>
          </li>
        </div>
        <div className={styles.btnWarapper}>
          <li>
            <Link to="/" className={styles.btnLink} onClick={closeMenu}>
              <Button type="navBtn" onClick={handleClick}>
                {!isLoading ? 'Log Out' : <SpinnerMini />}
              </Button>
            </Link>
          </li>
        </div>
      </ul>

      <div ref={hamburgerRef} className={styles.hamburgerWrapper}>
        <Hamburger
          toggled={isHambugerOpen}
          toggle={() => setHamburgerOpen((prev) => !prev)}
          label="Show menu"
          color="#02057b"
          size={22}
        />
      </div>
    </div>
  );
};

export default AdminNav;
