import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import { useDeleteUser } from './useDeleteUser';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './UpdateProfileForm.module.css';

const UpdateProfileForm = () => {
  const { handleSubmit, reset, control } = useForm();
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { deleteRequest, isDeleting } = useDeleteUser();

  const onSubmit = async (data, e) => {
    const { email, password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      e.preventDefault();
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

  const handleDeleteAccount = async () => {
    deleteRequest({ id: user.id, delete_request_received: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <fieldset>
          <legend>Update Email</legend>
          <p className={styles.currentEmail}>
            Your current email address is:<span>{user.email}</span>
          </p>
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
                label="New Email Address"
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

          <Button>Update</Button>
          <p className={styles.updateInstruction}>
            You&apos;ll get a confirmation link at your new email to verify the
            changes.
          </p>
        </fieldset>
      </form>
      <div className={styles.deleteAccount}>
        <p>I want to reset my password.</p>
        <Link to="/resetpassword">
          <Button>Reset Password</Button>
        </Link>
      </div>

      {/* <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <fieldset>
          <legend>Update Password</legend>
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
                variant="filled"
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
                variant="filled"
                error={!!error}
                helperText={error ? error.message : ''}
              />
            )}
          />

          <Button>{!isUpdating ? 'Update' : <SpinnerMini />}</Button>
        </fieldset>
      </form> */}
      <div className={styles.deleteAccount}>
        <p>I want to delete my account.</p>
        <Button onClick={handleDeleteAccount}>
          {!isDeleting ? 'Delete Account' : <SpinnerMini />}
        </Button>
      </div>
    </>
  );
};

export default UpdateProfileForm;
