import { useForm, Controller } from 'react-hook-form';
import { useResetPassword } from './useResetPassword';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import styles from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const { resetPassword } = useResetPassword();

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
        rules={{ required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
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
      <Button type="rectangle">SEND</Button>
    </form>
  );
};

export default ForgotPasswordForm;
