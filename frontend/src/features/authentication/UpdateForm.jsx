import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUser';
import { toast } from 'react-hot-toast';
import Button from '../../ui/Button';
import styles from './UpdateForm.module.css';

const UpdateForm = () => {
  const { register, handleSubmit, getValues, reset } = useForm();

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = (data) => {
    const {email, emailConfirm, password, passwordConfirm} = data;
    console.log(data );
    
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
      <label htmlFor='email'>Email</label>
      <input type='email' 
        id="email" 
        disabled={isUpdating} 
        {...register('email')} 
      />
      <label htmlFor='emailConfirm'>Confirm Email</label>
      <input type='email'
        id="emailConfirm"
        disabled={isUpdating}
        {...register('emailConfirm', {
          validate: (value) =>
            getValues().email === value || 'Emails needs to match',
        })}
      />

      <label htmlFor='password'>Password</label>
      <input type="password"
        id="password"
        disabled={isUpdating}
        {...register('password')}
      />
      <label htmlFor='passwordConfirm'>Confirm Password</label>
      <input type="password"
        id="passwordConfirm"
        disabled={isUpdating}
        {...register('passwordConfirm', {
          validate: (value) =>
            getValues().password === value || 'Passwords needs to match',
        })}
      />
      <Button type='submit'>Update</Button>
      <Button type='reset'>Cancel</Button>
    </form>
  );
};

export default UpdateForm;
