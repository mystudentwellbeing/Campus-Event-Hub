import { useForm, Controller } from 'react-hook-form';
// import { useLogin } from './useLogin';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm();

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Reset Your Password</h3>
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

      <Button type="signup">Reset Password</Button>
    </form>
  );
};

export default ResetPasswordForm;
