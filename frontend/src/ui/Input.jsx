import styles from './Input.module.css';

const Input = ({ type, id, name, value, placeholder, onChange, disabled }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      className={`${styles.input} ${styles[type]}`}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    ></input>
  );
};

export default Input;
