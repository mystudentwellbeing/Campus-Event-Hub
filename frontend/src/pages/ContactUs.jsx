// import styles from './SubmitEvents.module.css';
import styles from './ContactUs.module.css';
import { useRef, useState } from 'react';
import TermsConditions from '../features/TermsConditions';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [termsCondition, setTermsCondition] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Form Submitted`);
  };
  const formRef = useRef(null);
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }};
  //return <div>ContactUs</div>;
  return (
    <div className={styles.submitContact}>
      <h3 className={styles.title}>Contact Us</h3>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.formContainer}>
          <div>
            <label>Name</label>
            <input
              type="textbox"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="textbox"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              className={styles.formContainerTextarea}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className={styles.formContainerTerms}>
          <input
            type="checkbox"
            name="termsCondition"
            value={termsCondition}
            onChange={(e) => setTermsCondition(e.target.value)}
            required
          />
          <label>
            <a onClick={() => setModalOpen((show) => !show)}>
              Terms and Conditions
            </a>
            {isModalOpen && (
              <Modal
                title="Terms and Conditions"
                onClose={() => setModalOpen(false)}
              >
                <TermsConditions onCloseModal={() => setModalOpen(false)} />
              </Modal>
            )}
          </label>
        </div>
        <div className={styles.formbtnContainer}>
            <Button 
              type="submit" 
              className={styles.btnContact}
            >
              Submit
            </Button>
            <Button
              type="reset"
              className={styles.btnContact}
              onClick={handleReset}
            >
              Cancel
            </Button>
        </div>
      </form>
    </div>
  )
};

export default ContactUs;
