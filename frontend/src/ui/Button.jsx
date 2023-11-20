import styles from './Button.module.css';

const Button = ({ children, onClick, type, className }) => {
  const buttonClass = `${styles.btn} ${styles[type]} ${className || ''}`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
