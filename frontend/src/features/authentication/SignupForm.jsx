import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSignup } from './useSignup';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const { signup, isLoading } = useSignup();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm();

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
        rules={{ required: true, minLength: 6 }}
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
      {errors.password && errors.password.type === 'minLength' && (
        <div className={styles.errorMsg}>
          Password should be at-least 6 characters.
        </div>
      )}

      <Controller
        name="passwordConfirm"
        control={control}
        defaultValue=""
        rules={{
          required: true,
          minLength: 6,
          validate: {
            matchesPassword: (value) =>
              value === password || 'Passwords do not match',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="passwordConfirm"
            label="Confirm Password"
            disabled={isLoading}
            type="password"
            variant="outlined"
          />
        )}
      />
      {errors.passwordConfirm && errors.passwordConfirm.type === 'required' && (
        <div className={styles.errorMsg}>Confirm Password is required.</div>
      )}
      {errors.passwordConfirm &&
        errors.passwordConfirm.type === 'minLength' && (
          <div className={styles.errorMsg}>
            Your Confirm Password should be same as password.
          </div>
        )}
      {errors.passwordConfirm &&
        errors.passwordConfirm.type === 'matchesPassword' && (
          <div className={styles.errorMsg}>Passwords do not match.</div>
        )}

      <Button type="signup">Creat Account</Button>
      <div className={styles.linkWrapper}>
        <p>Already a member?</p>
        <Link to="/login">Sign in here!</Link>
      </div>
    </form>
  );
};

export default SignupForm;
