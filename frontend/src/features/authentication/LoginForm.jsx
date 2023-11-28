import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailRequired, setEmailRequired] = useState('');
  const [passwordRequired, setPasswordRequired] = useState('');
  const { login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const emailFormat = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    const emailFormat =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    if (!email.trim() && !password.trim()) {
      setEmailRequired('Email is required');
      setPasswordRequired('Password is required');
      return;
    } else {
      setEmailRequired('');
      setPasswordRequired('');
    }

    if (!email.trim()) {
      setEmailRequired('Email is required');
      return;
    } else if (!emailFormat.test(email)) {
      setEmailRequired('Email is not valid!');
      return;
    } else {
      setEmailRequired('');
    }

    if (!password.trim()) {
      setPasswordRequired('Password is required');
      return;
    } else {
      setPasswordRequired('');
    }

    if (!email || !password) return;
    login(
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
    <form className={styles.loginContainer} onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailRequired('');
          }}
          value={email}
          disabled={isLoading}
        />
        {
          emailRequired && <div className={styles.error}>{emailRequired}</div>
        }
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordRequired('');
          }}
          value={password}
        />
        {
          passwordRequired && <div className={styles.error}>{passwordRequired}</div>
        }
        {/* {error && <div className={styles.error}>{error}</div>} */}
        <Button type="login">Log In</Button>
        <p>Not a member?</p>
        <Link to="/signup">Sign up here!</Link>
      </div>
    </form>
  );
};

export default LoginForm;
