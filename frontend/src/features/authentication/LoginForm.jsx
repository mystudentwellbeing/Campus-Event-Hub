import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from './useLogin';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const { login, isLoading } = useLogin();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
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
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
            disabled={isLoading}
            type="email"
            variant="outlined"
          />
        )}
      />
      {errors.email && errors.email.type === 'required' && (
        <div className={styles.errorMsg}>Email is required.</div>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <div className={styles.errorMsg}>Email is not valid.</div>
      )}

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            disabled={isLoading}
            type="password"
            variant="outlined"
          />
        )}
      />
      {errors.password && errors.password.type === 'required' && (
        <div className={styles.errorMsg}>Password is required.</div>
      )}
      <Button type="rectangle">Log In</Button>
      <div className={styles.linkWrapper}>
        <Link to="/forgotpassword">Forgot password?</Link>
        <Link to="/signup" className={styles.link}>
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
