import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useUpdateUser } from './useUpdateUser';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const { handleSubmit, reset, watch, control } = useForm();
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
            disabled={isUpdating}
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
            disabled={isUpdating}
            type="password"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />

      <Button type="rectangle">
        {!isUpdating ? 'Reset Password' : <SpinnerMini />}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
