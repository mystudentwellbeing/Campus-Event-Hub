import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from './useLogin';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const { login, isLoading } = useLogin();

  const { handleSubmit, reset, control } = useForm();

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
        rules={{
          required: 'Email is required.',
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'Email address must be a valid address',
          },
        }}
        render={({ field, fieldState: { error } }) => (
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
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'Password is required.' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            disabled={isLoading}
            type="password"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />

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
