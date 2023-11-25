import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from './useSignup';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    signup(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  return (
    <form className={styles.signupContainer} onSubmit={handleSubmit}>
      <h3>Create an account</h3>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          disabled={isLoading}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <Input
          type="password"
          id="password"
          placeholder="confirm password"
          value={password}
        />
        <Button type="signin">Creat account</Button>
        <p>Already a member?</p>
        <Link to="/login">Sign in here!</Link>
      </div>
    </form>
  );
};

export default SignupForm;
