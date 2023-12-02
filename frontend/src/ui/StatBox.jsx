import styles from './StatBox.module.css';

const StatBox = ({ IconComponent, title, count }) => (
  <div className={styles.statBox}>
    <IconComponent className={styles.icon} />
    <div className={styles.statWrapper}>
      <h4>{title.toUpperCase()}</h4>
      <p>{count}</p>
    </div>
  </div>
);

export default StatBox;
