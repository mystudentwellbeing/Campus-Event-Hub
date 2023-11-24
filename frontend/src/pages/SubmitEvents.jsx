import { useRef, useState } from 'react';
import TermsConditions from '../features/TermsConditions';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import styles from './SubmitEvents.module.css';
import supabase from '../services/supabase';

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
  const [eventFormat, setEventFormat] = useState('');
  const [eventType, setEventType] = useState('');
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
  const [isModalOpen, setModalOpen] = useState(false);

  const formRef = useRef(null);

  const today = new Date();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Event Submitted`);
    console.log(typeof(image));

    // trying to upload image in our storage bucket
    if (image && image instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
      const imageData = reader.result;

      const { data, error } = await supabase.storage
        .from('event_image')
        .upload(imageData, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (error) {
        console.error('Error uploading image:', error);
      } else {
        const imageUrl = data?.url;
        console.log('Image uploaded successfully. URL:', imageUrl);
      }}
    }

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
    setEventFormat('');
    setEventType('');
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
  };

  const handleReset = () => {
    if (formRef.current) {
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
      setEventFormat('');
      setEventType('');
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
  };

  return (
    <div className={styles.submitEvents}>
      <h3 className={styles.title}>Submit your event</h3>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Name</label>
            <input
              type="textbox"
              name="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contact Phone#</label>
            <input
              type="textbox"
              name="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Email</label>
            <input
              type="textbox"
              name="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Name of Orgnization(Student Club)</label>
            <input
              type="textbox"
              name="nameOfOrg"
              value={nameOfOrg}
              onChange={(e) => setNameOfOrg(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Name of Instituion</label>
            <select
              name="nameOfInst"
              className={styles.dropdownStyle}
              value={nameOfInst}
              onChange={(e) => setNameOfInst(e.target.value)}
            >
              <option value="">Select University</option>
              <option value="university_of_manitoba">University of Manitoba</option>
              <option value="university_of_winnipeg">University of Winnipeg</option>
              {console.log(nameOfInst)}
            </select>
            {/* <input
              type="textbox"
              name="nameOfInst"
              value={nameOfInst}
              onChange={(e) => setNameOfInst(e.target.value)}
            /> */}
          </div>
          <div>
            <label>Name of Event</label>
            <input
              type="textbox"
              name="nameOfEvent"
              value={nameOfEvent}
              onChange={(e) => setNameOfEvent(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={date}
              min={today.toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Start & End Time</label>
            <input
              type="time"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input
              type="time"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className={styles.checkBoxHeading}>Event Type</label>
          <div className={styles.formContainerCheckbox}>
            <div className={styles.checkboxRow}>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                />
                <label>NETWORKING</label>
              </div>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                />
                <label>CAMPUS</label>
              </div>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                />
                <label>CULTURAL</label>
              </div>
            </div>
          </div>
          <div className={styles.formContainerCheckbox}>
            <div className={styles.checkboxRow}>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                />
                <label>HOBBIES</label>
              </div>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                />
                <label>SPORTS</label>
              </div>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                />
                <label>EDUCATIONAL</label>
              </div>
            </div>
          </div>
          <div className={styles.formContainerCheckbox}>
            <div className={styles.checkboxRow}>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                />
                <label>NIGHTLIFE</label>
              </div>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                />
                <label>ARTS</label>
              </div>
              <div>
                <input
                    type="checkbox"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                />
                <label>WELLBEING</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
        
          {/* <div>
            <label>Type</label>
            <select
              name="type"
              className={styles.dropdownStyle}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Event Type</option>
              <option value="NETWORKING">NETWORKING</option>
              <option value="CAMPUS">CAMPUS</option>
              <option value="CULTURAL">CULTURAL</option>
              <option value="HOBBIES">HOBBIES</option>
              <option value="SPORTS">SPORTS</option>
              <option value="EDUCATIONAL">EDUCATIONAL</option>
              <option value="NIGHTLIFE">NIGHTLIFE</option>
              <option value="ARTS">ARTS</option>
              <option value="WELLBEING">WELLBEING</option>
              {console.log(type)}
            </select>
          </div> */}
          <div>
            <label>Address(Street No.& Name) of Event</label>
            <input
              type="textbox"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Name of Venue</label>
            <input
              type="textbox"
              name="nameOfVenue"
              value={nameOfVenue}
              onChange={(e) => setNameOfVenue(e.target.value)}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="textbox"
              name="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>City</label>
            <input
              type="textbox"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>If virtual - virtual link</label>
            <input
              type="textbox"
              name="virtualLink"
              value={virtualLink}
              onChange={(e) => setVirtualLink(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formContainerSpecial}>
            <label>Short Description(150 characters)</label>
            <input
              type="textbox"
              name="shortDesc"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
            <label>Price of Ticket</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
            <label>Image</label>
            <input
              type="file"
              name="image"
              accept="image/png image/jpeg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Description of Event</label>
            <textarea
              className={styles.formContainerTextarea}
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
        <div className={styles.formContainer}>
          <Button type="submit" className={styles.btnEvents}>
            Submit
          </Button>
          <Button
            type="reset"
            className={styles.btnEvents}
            onClick={handleReset}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitEvents;
