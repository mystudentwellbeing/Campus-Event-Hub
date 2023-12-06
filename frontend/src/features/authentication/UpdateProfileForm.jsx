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

  // const handleReset = () => {
  //   reset();
  // };

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <fieldset>
          <legend>Update Password</legend>
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
                label="New Password"
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

          <Button>Update</Button>
        </fieldset>
      </form>
      <div className={styles.deleteAccount}>
        <p>I want to delete my account.</p>
        <Button onClick={handleDeleteAccount}>Delete Account</Button>
      </div>
    </>
  );
};

export default UpdateProfileForm;
