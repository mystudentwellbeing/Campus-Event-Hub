import { SlSocialInstagram } from 'react-icons/sl';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialLinkedin } from 'react-icons/sl';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.email}>Email</div>
      <div className={styles.terms}></div>
      <div className={styles.social}>
        <SlSocialInstagram className={styles.reactIcons} />
        <SlSocialFacebook className={styles.reactIcons} />
        <SlSocialLinkedin className={styles.reactIcons} />
      </div>
    </footer>
  );
};

export default Footer;
