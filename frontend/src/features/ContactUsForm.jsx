import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import TermsConditions from '../ui/TermsConditionsContent';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import styles from './ContactUsForm.module.css';

const ContactUsForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    control,
    handleSubmit,

    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, message } = data;

    // this is the ids that I have in EmailJS
    // for youku email const serviceID = 'service_8c4r4kd';
    const serviceID = 'service_qgmz8ep';
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
      });
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Contact Us</h3>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            autoFocus
            variant="filled"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: 'Email is required.',
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'Email address must be a valid address',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
            type="email"
            variant="filled"
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />
      <Controller
        name="message"
        control={control}
        defaultValue=""
        rules={{ required: 'Your message is required to submit' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="message"
            label="Message"
            autoFocus
            variant="filled"
            multiline
            rows={12}
            error={!!error}
            helperText={error ? error.message : ''}
          />
        )}
      />

      <div className={styles.termsWrapper}>
        <Controller
          name="termsCondition"
          control={control}
          defaultValue={false}
          rules={{ required: 'Please Check the Box to submit' }}
          render={({ field: { value, ...field }, fieldState: { error } }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={value}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
                  />
                }
                label={
                  <a onClick={() => setModalOpen((show) => !show)}>
                    Terms and Conditions
                  </a>
                }
              />
              {error && (
                <FormHelperText error={!!error}>{error.message}</FormHelperText>
              )}
            </>
          )}
        />
        {isModalOpen && (
          <Modal
            title="Terms and Conditions"
            onClose={() => setModalOpen(false)}
          >
            <TermsConditions onCloseModal={() => setModalOpen(false)} />
          </Modal>
        )}
      </div>

      <div className={styles.formbtnContainer}>
        <Button type="submit" className={styles.btnContact}>
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
  );
};

export default ContactUsForm;
