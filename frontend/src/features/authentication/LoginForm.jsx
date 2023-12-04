import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import Button from '../../ui/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="email"
          {...register('email', {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          })}
          disabled={isLoading}
        />

        {errors.email && errors.email.type === 'required' && (
          <div className={styles.errorMsg}>Email is required.</div>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <div className={styles.errorMsg}>Email is not valid.</div>
        )}
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="password"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <div className={styles.errorMsg}>Password is required.</div>
        )}
        <Button type="submit">Log In</Button>
        <p>Not a member?</p>
        <Link to="/signup">Sign up here!</Link>
      </div>
    </form>
  );
};

export default LoginForm;
