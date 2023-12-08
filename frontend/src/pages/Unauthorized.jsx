import { Link } from 'react-router-dom';
import { IoWarningOutline } from 'react-icons/io5';
import styles from './NotFoundAuthPage.module.css';

const Unauthorized = () => {
  return (
    <main className={styles.notFoundAuthContainer}>
      <h1>Unauthorized Access</h1>
      <IoWarningOutline className={styles.icon} />
      <p>You are not authorized to access this page.</p>
      <Link to="/">Return to Homepage</Link>
    </main>
  );
};

export default Unauthorized;
