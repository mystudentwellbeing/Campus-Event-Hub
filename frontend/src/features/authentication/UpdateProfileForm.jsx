import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';
import { toast } from 'react-hot-toast';
import Button from '../../ui/Button';
import styles from './UpdateProfileForm.module.css';

const UpdateProfileForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = async (data, event) => {
    const { email, emailConfirm, password, passwordConfirm } = data;
    console.log(data);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.updateContainer}>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          disabled={isUpdating}
          {...register('email')}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="emailConfirm">Confirm Email</label>
        <input
          className={styles.input}
          type="email"
          id="emailConfirm"
          disabled={isUpdating}
          {...register('emailConfirm', {
            validate: (value) =>
              getValues().email === value || 'Emails needs to match',
          })}
        />
        {errors.emailConfirm && (
          <div className={styles.errorMsg}>{errors.emailConfirm.message}</div>
        )}
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          disabled={isUpdating}
          {...register('password')}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          className={styles.input}
          type="password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            validate: (value) =>
              getValues().password === value || 'Passwords needs to match',
          })}
        />
        {errors.passwordConfirm && (
          <div className={styles.errorMsg}>
            {errors.passwordConfirm.message}
          </div>
        )}
      </div>
      <Button type="submit">Update</Button>
      <Button type="reset" onClick={handleReset}>
        Cancel
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
