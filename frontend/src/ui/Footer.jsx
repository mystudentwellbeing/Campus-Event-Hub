import { MdOutlineEmail } from 'react-icons/md';
import { SlSocialInstagram } from 'react-icons/sl';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialLinkedin } from 'react-icons/sl';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className={styles.footerContainer}>
        <a href="mailto:jigisha@my.yorku.ca">
          <div className={styles.email}>
            <MdOutlineEmail className={styles.reactIcons} />
            <p>admin@campuseventhub.ca</p>
          </div>
        </a>
        <div className={styles.terms}>
          <p>Terms of Use and Privacy Policy</p>
          <p>&copy;{year} All rights reserved</p>
        </div>
        <div className={styles.social}>
          <a href="https://www.instagram.com/mystudentwellbeing/?hl=en" target="_blank" rel="noopener noreferrer">
            <SlSocialInstagram className={styles.reactIcons} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100076418081118" target="_blank" rel="noopener noreferrer">
            <SlSocialFacebook className={styles.reactIcons} />
          </a>
          <a href="https://www.linkedin.com/company/my-student-wellbeing/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
            <SlSocialLinkedin className={styles.reactIcons} />
          </a>
          {/* <SlSocialInstagram className={styles.reactIcons} />
          <SlSocialFacebook className={styles.reactIcons} />
          <SlSocialLinkedin className={styles.reactIcons} /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
