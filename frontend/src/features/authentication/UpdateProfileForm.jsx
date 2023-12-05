import { useForm, Controller } from 'react-hook-form';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import { useDeleteUser } from './useDeleteUser';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import styles from './UpdateProfileForm.module.css';

const UpdateProfileForm = () => {
  const {
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { deleteRequest } = useDeleteUser();

  const onSubmit = async (data, event) => {
    const { email, emailConfirm, password, passwordConfirm } = data;

    if (email !== emailConfirm) {
      event.preventDefault();
      toast.error('Emails need to match');
      return;
    }
    if (password !== passwordConfirm) {
      event.preventDefault();
      toast.error('Passwords need to match');
      return;
    }
    updateUser(
      { email, password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const handleReset = () => {
    reset();
  };

  const handleDeleteAccount = async () => {
    deleteRequest({ id: user.id, delete_request_received: true });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.updateContainer}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoFocus
              disabled={isUpdating}
              variant="filled"
              inputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{
                style: { fontSize: '1.2rem' },
              }}
            />
          )}
        />
        <Controller
          name="emailConfirm"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              getValues('email') === value || 'Emails need to match',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              id="emailConfirm"
              label="Confirm Email Address"
              disabled={isUpdating}
              variant="filled"
              inputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{
                style: { fontSize: '1.2rem' },
              }}
            />
          )}
        />
        {errors.emailConfirm && (
          <div className={styles.errorMsg}>{errors.emailConfirm.message}</div>
        )}
        <div className={styles.buttonWrapper}>
          <Button type="submit">Update</Button>
          <Button type="reset" onClick={handleReset}>
            Cancel
          </Button>
        </div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              type="password"
              id="password"
              label="Password"
              disabled={isUpdating}
              variant="filled"
              inputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{
                style: { fontSize: '1.2rem' },
              }}
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              getValues('password') === value || 'Passwords need to match',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              type="password"
              id="passwordConfirm"
              label="Confirm Password"
              disabled={isUpdating}
              variant="filled"
              inputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{
                style: { fontSize: '1.2rem' },
              }}
            />
          )}
        />
        {errors.passwordConfirm && (
          <div className={styles.errorMsg}>
            {errors.passwordConfirm.message}
          </div>
        )}
        <div className={styles.buttonWrapper}>
          <Button type="submit">Update</Button>
          <Button type="reset" onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
      <div className={styles.deleteAccount}>
        <p>I want to delete my account.</p>
        <Button type="submit" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </>
  );
};

export default UpdateProfileForm;
