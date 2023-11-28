import styles from './SpinnerMini.module.css';

const SpinnerMini = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default SpinnerMini;
