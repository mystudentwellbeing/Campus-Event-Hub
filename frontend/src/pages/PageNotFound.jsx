import { Link } from 'react-router-dom';
import { FaRegFaceGrinBeamSweat } from 'react-icons/fa6';
import styles from './NotFoundAuthPage.module.css';

const PageNotFound = () => {
  return (
    <main className={styles.notFoundAuthContainer}>
      <h1>Oops!</h1>
      <FaRegFaceGrinBeamSweat className={styles.icon} />
      <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
      <Link to="/">Return to Homepage</Link>
    </main>
  );
};

export default PageNotFound;
