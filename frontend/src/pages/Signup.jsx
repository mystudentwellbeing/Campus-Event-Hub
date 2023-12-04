import SignupForm from '../features/authentication/SignupForm';
import styles from './Signup.module.css';

const Signup = () => {
  return (
    <main className={styles.signup}>
      <SignupForm />
    </main>
  );
};

export default Signup;
