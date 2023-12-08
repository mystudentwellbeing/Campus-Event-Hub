import { useForm, Controller } from 'react-hook-form';
import { useResetPassword } from './useResetPassword';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const { handleSubmit, reset, control } = useForm();

  const { resetPassword, isResetting } = useResetPassword();

  const onSubmit = (data) => {
    const { email } = data;
    resetPassword(
      { email },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.forgotPasswordForm}
    >
      <h3>
        Enter the email address associated with your account and you will
        receive an email with instructions on how to reset your password.
      </h3>
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
            type="email"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
      <Button type="rectangle">
        {!isResetting ? 'SEND' : <SpinnerMini />}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
