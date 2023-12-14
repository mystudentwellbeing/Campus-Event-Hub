import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import { useDeleteUser } from './useDeleteUser';
import { useLogout } from './useLogout';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './UpdateProfileForm.module.css';

const UpdateProfileForm = () => {
  const { handleSubmit, reset, control } = useForm();
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { deleteUser, isDeleting } = useDeleteUser();
  const { logout } = useLogout();

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

  const handleDeleteAccount = () => {
    deleteUser(
      { id: user.id, delete_request_received: true },
      {
        onSuccess: () => {
          logout();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
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
      <div className={styles.deleteAccount}>
        <p>I want to delete my account.</p>

        <Button onClick={handleDeleteAccount} type="delete">
          {!isDeleting ? 'Delete Account' : <SpinnerMini />}
        </Button>
      </div>
    </>
  );
};

export default UpdateProfileForm;
