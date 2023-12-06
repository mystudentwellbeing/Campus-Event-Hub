import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useUpdateUser } from './useUpdateUser';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import styles from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();

  const password = watch('password');

  const onSubmit = async (data, e) => {
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      e.preventDefault();
      toast.error('Passwords need to match');
      return;
    }
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.resetPasswordForm}
    >
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
            disabled={isUpdating}
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
            disabled={isUpdating}
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

      <Button type="rectangle">Reset Password</Button>
    </form>
  );
};

export default ResetPasswordForm;
