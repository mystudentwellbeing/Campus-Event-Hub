import SignupForm from '../features/authentication/SignupForm';
import styles from './Signup.module.css';

const Signup = () => {
  return (
    <main className={styles.signup}>
      <h1>Create an account</h1>
      <SignupForm />
    </main>
  );
};

export default Signup;
