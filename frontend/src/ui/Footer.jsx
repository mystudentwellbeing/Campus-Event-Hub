import { MdOutlineEmail } from 'react-icons/md';
import { SlSocialInstagram } from 'react-icons/sl';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialLinkedin } from 'react-icons/sl';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className={styles.email}>
          <MdOutlineEmail className={styles.reactIcons} />
          <p>admin@campuseventhub.ca</p>
        </div>
        <div className={styles.terms}>
          <p>Terms of Use and Privacy Policy</p>
          <p>&copy; All rights reserved</p>
        </div>
        <div className={styles.social}>
          <SlSocialInstagram className={styles.reactIcons} />
          <SlSocialFacebook className={styles.reactIcons} />
          <SlSocialLinkedin className={styles.reactIcons} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
