// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
// import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const { signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch('password'); // Get the value of the password field

  const onSubmit = (data) => {
    const { email, password, passwordConfirm } = data;
    console.log(data);
    signup(
      { email, password, passwordConfirm },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!email || !password) return;
  //   signup(
  //     { email, password },
  //     {
  //       onSettled: () => {
  //         setEmail('');
  //         setPassword('');
  //       },
  //     }
  //   );
  // };

  return (
    <form className={styles.signupContainer} onSubmit={handleSubmit(onSubmit)}>
      <h3>Create an account</h3>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="email"
          {...register('email', {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          })}
          // onChange={(e) => {
          //   setEmail(e.target.value);
          // }}
          // value={email}
          disabled={isLoading}
        />
        {errors.email && errors.email.type === 'required' && (
          <div className={styles.errorMsg}>Email is required.</div>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <div className={styles.errorMsg}>Email is not valid.</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="password"
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          // }}
          // value={password}
        />
        {errors.password && errors.password.type === 'required' && (
          <div className={styles.errorMsg}>Password is required.</div>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <div className={styles.errorMsg}>
            Password should be at-least 6 characters.
          </div>
        )}

        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          className={styles.input}
          type="password"
          id="passwordConfirm"
          placeholder="confirm password"
          {...register('passwordConfirm', {
            required: true,
            minLength: 6,
            validate: {
              matchesPassword: (value) =>
                value === password || 'Passwords do not match',
            },
          })}
          // value={password}
        />
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'required' && (
            <div className={styles.errorMsg}>Confirm Password is required.</div>
          )}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'minLength' && (
            <div className={styles.errorMsg}>
              Your Confirm Password should be same as password.
            </div>
          )}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'matchesPassword' && (
            <div className={styles.errorMsg}>Passwords do not match.</div>
          )}

        <Button type="submit">Creat account</Button>
        <p>Already a member?</p>
        <Link to="/login">Sign in here!</Link>
      </div>
    </form>
  );
};

export default SignupForm;
