import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSignup } from './useSignup';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const { signup, isLoading } = useSignup();

  const { handleSubmit, reset, watch, control } = useForm();

  const password = watch('password'); // Get the value of the password field

  const onSubmit = (data) => {
    const { email, password, passwordConfirm } = data;

    signup(
      { email, password, passwordConfirm },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <form className={styles.signupContainer} onSubmit={handleSubmit(onSubmit)}>
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
        rules={{
          required: 'Password is required.',
          minLength: {
            value: 6,
            message: 'Password should be at least 6 characters.',
          },
        }}
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
      <Controller
        name="passwordConfirm"
        control={control}
        defaultValue=""
        rules={{
          required: 'Confirm Password is required.',
          validate: {
            matchesPassword: (value) =>
              value === password || 'Passwords do not match.',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="passwordConfirm"
            label="Confirm Password"
            disabled={isLoading}
            type="password"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
      <Button type="rectangle">
        {!isLoading ? 'Create Account' : <SpinnerMini />}
      </Button>
      <div className={styles.linkWrapper}>
        <p>Already a member?</p>
        <Link to="/login">Sign in here!</Link>
      </div>
    </form>
  );
};

export default SignupForm;
