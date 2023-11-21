import LoginForm from '../features/authentication/LoginForm';
import styles from './Login.module.css';

const Login = () => {
  return (
    <main className={styles.login}>
      <LoginForm />
    </main>
  );
};

export default Login;
