import { useState } from 'react';
import emailjs from 'emailjs-com';
import TermsConditions from '../features/TermsConditions';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import styles from './ContactUsForm.module.css';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const ContactUsForm = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  const [termsCondition, setTermsCondition] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, formState: {errors}, reset } = useForm();

  const onSubmit = (data) => {
    //event.preventDefault();

    const { name, email, message } = data;

    // this is the ids that I have in EmailJS
    const serviceID = 'service_8c4r4kd';
    const templateID = 'template_5vk37vn';
    const userID = 'DvB3W4EsoBtfY5Ljj';

    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: name,
          email: email,
          message: message,
        },
        userID
      )

      .then((response) => {
        console.log('Email sent!', response);
        toast.success('Form Submitted and Email Sent!');
        reset();
      })

      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error(error.message);
      })
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();

    // this is the ids that I have in EmailJS
    // const serviceID = 'service_8c4r4kd';
    // const templateID = 'template_5vk37vn';
    // const userID = 'DvB3W4EsoBtfY5Ljj';

    // emailjs
    //   .send(
    //     serviceID,
    //     templateID,
    //     {
    //       name: name,
    //       email: email,
    //       message: message,
    //     },
    //     userID
    //   )

    //   .then((response) => {
    //     console.log('Email sent!', response);
    //     toast.success('Form Submitted and Email Sent!');
    //   })

    //   .catch((error) => {
    //     console.error('Error sending email:', error);
    //     toast.error(error.message);
    //   });

    // handleReset();
  // };

  // const formRef = useRef(null);
  // const handleReset = () => {
  //   if (formRef.current) {
  //     formRef.current.reset();
  //     setName(''), setEmail(''), setMessage('');
  //   }
  // };

  return (
    <div className={styles.submitContact}>
      <h3 className={styles.title}>Contact Us</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <div>
            <label>Name</label>
            <input
              type="textbox"
              name="name"
              {...register("name")}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="emial"
              name="email"
              {...register("email", {
                required: 'Your email is required to submit',
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
              })}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              // required
            />
            {errors.email && (
              <p className={styles.errorMsg}>{errors.email.message}</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className={styles.errorMsg}>Email is Not Valid</p>
            )}
          </div>
          <div>
            <label>Message</label>
            <textarea
              className={styles.formContainerTextarea}
              name="message"
              {...register("message", {
                required: 'Your message is required to submit',
              })}
              // value={message}
              // onChange={(e) => setMessage(e.target.value)}
              // required
            ></textarea>
            {errors.message && (
              <p className={styles.errorMsg}>{errors.message.message}</p>
            )}
          </div>
        </div>
        <div className={styles.formContainerTerms}>
          <input
            type="checkbox"
            name="termsCondition"
            {...register("termsCondition", {
              required: 'Please Check the Box to submit'
            })}
            // value={termsCondition}
            // onChange={(e) => setTermsCondition(e.target.value)}
            // required
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
          {errors.termsCondition && (
              <p className={styles.errorMsg}>{errors.termsCondition.message}</p>
          )}
        </div>
        
        <div className={styles.formbtnContainer}>
          <Button type="submit" className={styles.btnContact}>
            Submit
          </Button>
          <Button
            type="reset"
            //onClick={reset}
            className={styles.btnContact}
            // onClick={handleReset}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
