import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
// import Input from '../../ui/Input';
import Button from '../../ui/Button';
import styles from './LoginForm.module.css';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [emailRequired, setEmailRequired] = useState('');
  // const [passwordRequired, setPasswordRequired] = useState('');
  const { login, isLoading } = useLogin();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // const emailFormat = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  //   const emailFormat =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
  //   if (!email.trim() && !password.trim()) {
  //     setEmailRequired('Email is required');
  //     setPasswordRequired('Password is required');
  //     return;
  //   } else {
  //     setEmailRequired('');
  //     setPasswordRequired('');
  //   }

  //   if (!email.trim()) {
  //     setEmailRequired('Email is required');
  //     return;
  //   } else if (!emailFormat.test(email)) {
  //     setEmailRequired('Email is not valid!');
  //     return;
  //   } else {
  //     setEmailRequired('');
  //   }

  //   if (!password.trim()) {
  //     setPasswordRequired('Password is required');
  //     return;
  //   } else {
  //     setPasswordRequired('');
  //   }

  //   if (!email || !password) return;
  //   login(
  //     { email, password },
  //     {
  //       onSettled: () => {
  //         setEmail('');
  //         setPassword('');
  //       },
  //     }
  //   );
  // };

  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    login(
          { email, password },
          {
            onSettled: () => {
              setEmail('');
              setPassword('');
            },
          });
  }
  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>

      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <input className={styles.input}
          type="email"
          id="email"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          })}
          // onChange={(e) => {
          //   setEmail(e.target.value);
          //   setEmailRequired('');
          // }}
          // value={email}
          disabled={isLoading}
        />
        {/* {
          emailRequired && <div className={styles.error}>{emailRequired}</div>
        } */}
        {errors.email && errors.email.type === "required" && (
          <div className={styles.errorMsg}>Email is required.</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className={styles.errorMsg}>Email is not valid.</div>
        )}
        <label htmlFor="password">Password</label>
        <input className={styles.input}
          type="password"
          id="password"
          placeholder="password"
          {...register("password", {
            required: true,
            minLength: 6
          })}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          //   setPasswordRequired('');
          // }}
          // value={password}
        />
        {/* {
          passwordRequired && <div className={styles.error}>{passwordRequired}</div>
        } */}
        {errors.password && errors.password.type === "required" && (
          <div className={styles.errorMsg}>Password is required.</div>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <div className={styles.errorMsg}>
            Password should be at-least 6 characters.
          </div>
        )}
        {/* {error && <div className={styles.error}>{error}</div>} */}
        <Button type="submit">Log In</Button>
        <p>Not a member?</p>
        <Link to="/signup">Sign up here!</Link>
      </div>
    </form>
  );
};

export default LoginForm;
