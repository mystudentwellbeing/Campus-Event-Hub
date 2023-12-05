import LoginForm from '../features/authentication/LoginForm';
import styles from './Login.module.css';

const Login = () => {
  return (
    <main className={styles.login}>
      <h1>Sign In</h1>
      <LoginForm />
    </main>
  );
};

export default Login;
