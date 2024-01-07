import SubmitEventForm from '../features/submitEvents/EventForm';

const SubmitEvents = () => {
  return (
    <main>
      <h1>Submit your event</h1>
      <p style={{ fontSize: '1.2rem' }}>
        Your contact name, phone number, and email will only be requested by My
        Student Wellbeing in case additional details regarding your event are
        needed.
      </p>
      <p style={{ fontSize: '1.2rem' }}>
        This information will be not displayed on the website.
      </p>
      <SubmitEventForm />
    </main>
  );
};

export default SubmitEvents;
