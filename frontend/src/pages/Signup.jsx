import SignupForm from '../features/authentication/SignupForm';
import styles from './Signup.module.css';

const Signup = () => {
  return (
    <div className={styles.signup}>
      <SignupForm />
    </div>
  );
};

export default Signup;
