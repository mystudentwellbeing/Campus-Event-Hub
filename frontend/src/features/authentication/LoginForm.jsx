import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('user1@test.com');
  const [password, setPassword] = useState('1234');

  const { error, resetError, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetError();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => resetError();
  }, [resetError]);

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <p style={{ color: 'red' }}>Use the following details to sign in. 🙂</p>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="email"
          onChange={(e) => {
            resetError();
            setEmail(e.target.value);
          }}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            resetError();
            setPassword(e.target.value);
          }}
          value={password}
        />
        {error && <div className={styles.error}>{error}</div>}
        <Button type="signin">Sign In</Button>
        <p>Not a member?</p>
        <Link to="/signup">Sign up here!</Link>
      </div>
    </form>
  );
};

export default LoginForm;
