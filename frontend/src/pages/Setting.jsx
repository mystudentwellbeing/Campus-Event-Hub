import UpdateProfileForm from '../features/authentication/UpdateProfileForm';
import styles from './Setting.module.css';

const Setting = () => {
  return (
    <main className={styles.setting}>
      <h1>Update Profile</h1>
      <UpdateProfileForm />
    </main>
  );
};

export default Setting;
