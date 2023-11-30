import UpdateForm from '../features/authentication/UpdateForm';
import styles from './Setting.module.css';

const Setting = () => {
  return (
    <main className={styles.container}>
      <h1>Update Profile</h1>
      <UpdateForm />
    </main>
  );
};

export default Setting;
