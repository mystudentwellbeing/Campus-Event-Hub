import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';
import { toast } from 'react-hot-toast';
import Button from '../../ui/Button';
import styles from './UpdateForm.module.css';

const UpdateForm = () => {
  const { register, handleSubmit, getValues, reset } = useForm();

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = ({ email, emailConfirm, password, passwordConfirm }) => {
    if (email !== emailConfirm) {
      toast.error('Emails need to match');
      return;
    }
    if (password !== passwordConfirm) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.updateForm}>
      <label>Email</label>
      <input id="email" disabled={isUpdating} {...register('email')} />
      <label>Confirm Email</label>
      <input
        id="emailConfirm"
        disabled={isUpdating}
        {...register('emailConfirm', {
          validate: (value) =>
            getValues().email === value || 'Emails needs to match',
        })}
      />

      <label>Password</label>
      <input
        id="password"
        type="password"
        disabled={isUpdating}
        {...register('password')}
      />
      <label>Confirm Password</label>

      <input
        id="passwordConfirm"
        type="password"
        disabled={isUpdating}
        {...register('passwordConfirm', {
          validate: (value) =>
            getValues().password === value || 'Passwords needs to match',
        })}
      />
      <Button>Update</Button>
      <Button>Cancel</Button>
    </form>
  );
};

export default UpdateForm;
