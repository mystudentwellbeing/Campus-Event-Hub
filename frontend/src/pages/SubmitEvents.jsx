import SubmitEventForm from '../features/submitEvents/EventForm';
import styles from './SubmitEvents.module.css';

const SubmitEvents = () => {
  return (
    <main>
      <h1>Submit your event</h1>
      <p className={styles.statement}>
        Contact name, phone number, and email are asked if My Student Wellbeing
        needs more information about your event. This information will be not be
        posted on the website.
      </p>
      <SubmitEventForm />
    </main>
  );
};

export default SubmitEvents;
