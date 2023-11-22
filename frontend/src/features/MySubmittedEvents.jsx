import styles from './MySubmittedEvents.module.css';
const MySubmittedEvents = () => {
  return (
    <main className={styles.container}>
      <h1>My Submitted Events</h1>
      <div className={styles.sectionContainer}>
        <section className={styles.approved}>
          <h2>Approved Events</h2>
        </section>
        <section className={styles.pending}>
          <h2>Pending Events</h2>
        </section>
      </div>
    </main>
  );
};

export default MySubmittedEvents;
