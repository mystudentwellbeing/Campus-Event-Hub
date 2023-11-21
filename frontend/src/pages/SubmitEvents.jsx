import { useRef, useState } from 'react';
import styles from './SubmitEvents.module.css';

const SubmitEvents = () => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [nameOfOrg, setNameOfOrg] = useState('');
  const [nameOfInst, setNameOfInst] = useState('');
  const [nameOfEvent, setNameOfEvent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [nameOfVenue, setNameOfVenue] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [virtualLink, setVirtualLink] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [termsCondition, setTermsCondition] = useState('');

  const formRef = useRef(null);

  const today = new Date();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Event Submitted`);

    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setNameOfOrg('');
    setNameOfInst('');
    setNameOfEvent('');
    setDate('');
    setTime('');
    setType('');
    setAddress('');
    setNameOfVenue('');
    setPostalCode('');
    setCity('');
    setVirtualLink('');
    setShortDesc('');
    setDesc('');
    setPrice('');
    setImage('');
    setTermsCondition('');
  }

  const handleReset = () => {
    if(formRef.current) {
      formRef.current.reset();
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setNameOfOrg('');
    setNameOfInst('');
    setNameOfEvent('');
    setDate('');
    setTime('');
    setType('');
    setAddress('');
    setNameOfVenue('');
    setPostalCode('');
    setCity('');
    setVirtualLink('');
    setShortDesc('');
    setDesc('');
    setPrice('');
    setImage('');
    setTermsCondition('');
    }
  }
  return (
    // <div>SubmitEvents</div>
    <div className={styles.submitEvents}>
      <h3 className={styles.title}>Submit your event</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Name</label>
            <input type='textbox'
              name='contactName'
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div>
            <label>Contact Phone#</label>
            <input type='textbox'
              name='contactPhone'
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Email</label>
            <input type='textbox'
              name='contactEmail'
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Name of Orgnization</label>
            <input type='textbox'
              name='nameOfOrg'
              value={nameOfOrg}
              onChange={(e) => setNameOfOrg(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Name of Instituion</label>
            <input type='textbox'
              name='nameOfInst'
              value={nameOfInst}
              onChange={(e) => setNameOfInst(e.target.value)}
            />
          </div>
          <div>
            <label>Name of Event</label>
            <input type='textbox'
              name='nameOfEvent'
              value={nameOfEvent}
              onChange={(e) => setNameOfEvent(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Date</label>
            <input type='date'
              name='date'
              value={date}
              placeholder='Select Event Date'
              min={today.toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Time</label>
            <input type='time'
              name='time'
              value={time}
              placeholder='Select Event Time'
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.formContainer}>
        <div>
            <label>Type</label>
            <input type='textbox'
              name='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div>
            <label>Address (Street Number & Name)</label>
            <input type='textbox'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
        <div>
            <label>Name of Venue</label>
            <input type='textbox'
              name='nameOfVenue'
              value={nameOfVenue}
              onChange={(e) => setNameOfVenue(e.target.value)}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input type='textbox'
              name='postalCode'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>City</label>
            <input type='textbox'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>If virtual - virtual link</label>
            <input type='textbox'
              name='virtualLink'
              value={virtualLink}
              onChange={(e) => setVirtualLink(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formContainerSpecial}>
            <label>Short Description(150 characters)</label>
            <input type='textbox'
              name='shortDesc'
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
            <label>Price of Ticket</label>
            <input type='textbox'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Image</label>
            <input type='textbox'
              name='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Description of Event</label>
            <textarea className={styles.formContainerTextarea}
              name='desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={styles.formContainer}>        
          <input type='checkbox'
            name='termsCondition'
            value={termsCondition}
            onChange={(e) => setTermsCondition(e.target.value)}
            required
          />
          <label><a>Terms and Conditions</a></label>
        </div>
        <div className={styles.formContainer}>
          <button type="submit">Submit</button>
          <button type="reset" onReset={handleReset}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitEvents;
