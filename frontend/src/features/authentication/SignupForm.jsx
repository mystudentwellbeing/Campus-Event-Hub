import { Link } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  return (
    <div className={styles.signupContainer}>
      <h3>Create an account</h3>
      <p style={{ color: 'red' }}>
        Still in progress! 😅 Kindly head over to the sign-in page.
      </p>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <Input placeholder="email" disabled />
        <label htmlFor="password">Password</label>
        <Input placeholder="password" disabled />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <Input placeholder="password" disabled type="password" />
        <Button type="signin">Creat account</Button>
        <p>Already a member?</p>
        <Link to="/login">Sign in here!</Link>
      </div>
    </div>
  );
};

export default SignupForm;
