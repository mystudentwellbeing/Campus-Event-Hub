import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import useOutsideClick from '../../hooks/useOutsideClick';
import Button from '../Button';
import logo from '../../assets/logo.png';
import styles from './NotLoggedInNav.module.css';

const NotLoggedInNav = () => {
  const [isHambugerOpen, setHamburgerOpen] = useState(false);

  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);

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
      <Link to="/">
        <h2>Student Event Hub</h2>
      </Link>

      <ul
        ref={dropdownRef}
        className={isHambugerOpen ? styles.navMenuDropdown : styles.navMenu}
      >
        <div className={styles.menuWrapper}>
          <li>
            <Link to="/aboutus" onClick={closeMenu}>
              ABOUT US
            </Link>
          </li>
          <li>
            <Link to="/submitevents" onClick={closeMenu}>
              SUBMIT EVENTS
            </Link>
          </li>
        </div>
        <div className={styles.btnWarapper}>
          <li>
            <Link to="/login" className={styles.btnLink} onClick={closeMenu}>
              <Button type="login">Log In</Button>
            </Link>
          </li>
          <li>
            <Link to="/signup" className={styles.btnLink} onClick={closeMenu}>
              <Button type="signup">Sign Up</Button>
            </Link>
          </li>
        </div>
      </ul>

      <div ref={hamburgerRef} className={styles.hamburgerWrapper}>
        <Hamburger
          toggled={isHambugerOpen}
          toggle={() => setHamburgerOpen((prev) => !prev)}
          label="Show menu"
        />
      </div>
    </div>
  );
};

export default NotLoggedInNav;
