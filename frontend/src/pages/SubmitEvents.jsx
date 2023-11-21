import { useRef, useState } from 'react';
import styles from './SubmitEvents.module.css';
import Button from '../ui/Button';

const SubmitEvents = () => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [nameOfOrg, setNameOfOrg] = useState('');
  const [nameOfInst, setNameOfInst] = useState('');
  const [nameOfEvent, setNameOfEvent] = useState('');
  const [date, setDate] = useState('');
  //const [time, setTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
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
    //setTime('');
    setStartTime('');
    setEndTime('');
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
    //setTime('');
    setStartTime('');
    setEndTime('');
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
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Name</label>
            <input type='textbox'
              name='contactName'
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
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
              min={today.toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Start & End Time</label>
            <input type='time'
              name='startTime'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input type='time'
              name='endTime'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.formContainer}>
        <div>
            <label>Type</label>
            <select
              name='type'
              className={styles.dropdownStyle}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
            <option value=''>Select Event Type</option>
            <option value='NETWORKING'>NETWORKING</option>
            <option value='CAMPUS'>CAMPUS</option>
            <option value='CULTURAL'>CULTURAL</option>
            <option value='HOBBIES'>HOBBIES</option>
            <option value='SPORTS'>SPORTS</option>
            <option value='EDUCATIONAL'>EDUCATIONAL</option>
            <option value='NIGHTLIFE'>NIGHTLIFE</option>
            <option value='ARTS'>ARTS</option>
            <option value='WELLBEING'>WELLBEING</option>
            {console.log(type)}
            </select>
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
            <input type='number'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min='0'
              step='0.01'
              required
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
          <a><label>Terms and Conditions</label></a>
        </div>
        <div className={styles.formContainer}>
          <Button type='submit' className={styles.btnEvents}>Submit</Button>
          <Button type='reset' className={styles.btnEvents} onClick={handleReset}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitEvents;
