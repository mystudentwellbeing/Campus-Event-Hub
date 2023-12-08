import { MdOutlineEmail } from 'react-icons/md';
import { SlSocialInstagram } from 'react-icons/sl';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialLinkedin } from 'react-icons/sl';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className={styles.emailWrapper}>
          <a href="mailto:events@mystudentwellbeing.ca">
            <div className={styles.email}>
              <MdOutlineEmail className={styles.icon} />
              <p>events@mystudentwellbeing.ca</p>
            </div>
          </a>
        </div>

        <div className={styles.termsWrapper}>
          <Link
            to="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Terms of Use and Privacy Policy</p>
          </Link>
          <p>&copy;{year} All rights reserved</p>
        </div>

        <div className={styles.socialWrapper}>
          <a
            href="https://www.instagram.com/mystudentwellbeing/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SlSocialInstagram className={styles.icon} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100076418081118"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SlSocialFacebook className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/company/my-student-wellbeing/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SlSocialLinkedin className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
