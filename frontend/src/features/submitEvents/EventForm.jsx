import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../../features/authentication/useUser';
import { useCreateEvent } from './useCreateEvent';
import { useEditEvent } from './useEditEvent';
import TermsConditions from '../TermsConditions';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import styles from './EventForm.module.css';

const EventForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const eventToEdit = location.state?.event;
  const editId = eventToEdit?.id;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    defaultValues: isEditSession
      ? { ...eventToEdit, type: eventToEdit.type || [] }
      : { type: [] },
  });

  //const { errors } = formState;
  const { user } = useUser();
  const { isCreating, createEvent } = useCreateEvent();
  const { isEditing, editEvent } = useEditEvent();
  const isWorking = isCreating || isEditing;
  const today = new Date();

  const navigate = useNavigate();

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editEvent(
        {
          newEventData: {
            ...data,
            image,
            is_approved: false,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            navigate('/viewmyevents/mysubmittedevents');
          },
        }
      );
    else
      createEvent(
        { ...data, image, user_id: user.id },
        {
          onSuccess: () => {
            reset();
            navigate('/viewmyevents/mysubmittedevents');
          },
        }
      );
  };

  return (
    <>
      <h3 className={styles.title}>Submit your event</h3>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Name</label>
            <input
              type="text"
              id="contactName"
              disabled={isWorking}
              {...register('contact_name', {
                required: 'This field is required',
              })}
            />
            {errors.contact_name && (
              <div className={styles.errorMsg}>{errors.contact_name.message}</div>
            )}
          </div>
          <div>
            <label>Contact Phone #</label>
            <input
              type="text"
              id="contactPhone"
              disabled={isWorking}
              {...register('contact_phone', {
                required: 'This field is required',
              })}
            />
            {errors.contact_phone && (
              <div className={styles.errorMsg}>{errors.contact_phone.message}</div>
            )}
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Contact Email</label>
            <input
              type="text"
              id="contactEmail"
              disabled={isWorking}
              {...register('contact_email', {
                required: 'This field is required',
              })}
            />
            {errors.contact_email && (
              <div className={styles.errorMsg}>{errors.contact_email.message}</div>
            )}
          </div>
          <div>
            <label>Name of Orgnization(Student Club)</label>
            <input
              type="text"
              id="nameOfOrg"
              disabled={isWorking}
              {...register('name_of_org')}
            />
            {/* {errors.name_of_org && (
              <div className={styles.errorMsg}>{errors.name_of_org.message}</div>
            )} */}
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Name of Instituion</label>
            <select
              id="nameOfInst"
              className={styles.dropdownStyle}
              {...register('name_of_inst')}
            >
              <option value="">Select University</option>
              <option value="University_of_Manitoba">
                University of Manitoba
              </option>
              <option value="University_of_Winnipeg">
                University of Winnipeg
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Name of Event</label>
            <input
              type="text"
              id="nameOfEvent"
              disabled={isWorking}
              {...register('name', {
                required: 'This field is required',
              })}
            />
            {errors.name && (
              <div className={styles.errorMsg}>{errors.name.message}</div>
            )}
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Date</label>
            <input
              type="date"
              id="date"
              disabled={isWorking}
              {...register('date', {
                required: 'This field is required',
                min: today.toISOString().split('T')[0],
              })}
            />
            {errors.date && (
              <div className={styles.errorMsg}>{errors.date.message}</div>
            )}
          </div>
          <div>
            <label>Event Start & End Time</label>
            <input
              type="time"
              id="startTime"
              {...register('start_time', {
                required: 'This field is required',
              })}
            />
            {errors.start_time && (
              <div className={styles.errorMsg}>{errors.start_time.message}</div>
            )}
            <input
              type="time"
              id="endTime"
              disabled={isWorking}
              {...register('end_time', {
                required: 'This field is required',
              })}
            />
            {errors.end_time && (
              <div className={styles.errorMsg}>{errors.end_time.message}</div>
            )}
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
                  id="NETWORKING"
                  value="NETWORKING"
                  {...register('type', {
                    required: 'Please select at-least one event type'
                  })}
                />
                <label>NETWORKING</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="eventType"
                  id="CAMPUS"
                  value="CAMPUS"
                  {...register('type')}
                />
                <label>CAMPUS</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="eventType"
                  id="CULTURAL"
                  value="CULTURAL"
                  {...register('type')}
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
                  id="HOBBIES"
                  value="HOBBIES"
                  {...register('type')}
                />
                <label>HOBBIES</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="eventType"
                  id="SPORTS"
                  value="SPORTS"
                  {...register('type')}
                />
                <label>SPORTS</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="eventType"
                  id="EDUCATIONAL"
                  value="EDUCATIONAL"
                  {...register('type')}
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
                  id="NIGHTLIFE"
                  value="NIGHTLIFE"
                  {...register('type')}
                />
                <label>NIGHTLIFE</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="eventType"
                  id="ARTS"
                  value="ARTS"
                  {...register('type')}
                />
                <label>ARTS</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="eventType"
                  id="WELLBEING"
                  value="WELLBEING"
                  {...register('type')}
                />
                <label>WELLBEING</label>
              </div>
            </div>
          </div>
          {errors.type && (
              <div className={styles.errorMsg}>{errors.type.message}</div>
          )}
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Event Format</label>
            <select
              id="eventFormat"
              className={styles.dropdownStyle}
              disabled={isWorking}
              {...register('event_format', {
                required: 'This field is required',
              })}
            >
              <option value="">Select Event Format</option>
              <option value="Virtual">Virtual</option>
              <option value="In-person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.event_format && (
              <div className={styles.errorMsg}>{errors.event_format.message}</div>
            )}
          </div>
          <div>
            <label>Address(Street No.& Name) of Event</label>
            <input
              type="text"
              id="address"
              disabled={isWorking}
              {...register('address')}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>Name of Venue</label>
            <input
              type="text"
              id="nameOfVenue"
              disabled={isWorking}
              {...register('name_of_venue')}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              id="postalCode"
              disabled={isWorking}
              {...register('postal_code')}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div>
            <label>City</label>
            <input
              type="text"
              id="city"
              disabled={isWorking}
              {...register('city')}
            />
          </div>
          <div>
            <label>If virtual - virtual link</label>
            <input
              type="text"
              id="virtualLink"
              disabled={isWorking}
              {...register('virtual_link')}
            />
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formContainerSpecial}>
            <label>Short Description(150 characters)</label>
            <input
              type="text"
              id="shortDesc"
              disabled={isWorking}
              {...register('short_description', {
                required: 'This field is required',
              })}
            />
            {errors.short_description && (
              <div className={styles.errorMsg}>{errors.short_description.message}</div>
            )}
            <label>Price of Ticket</label>
            <input
              type="number"
              id="price"
              disabled={isWorking}
              {...register('price', {
                required: 'This field is required',
                min: '0',
                step: '0.01',
              })}
            />
            {errors.price && (
              <div className={styles.errorMsg}>{errors.price.message}</div>
            )}
            {errors.price && errors.price.type === "min" && (
              <div className={styles.errorMsg}>Price must be 0 or more</div>
            )}
            <label>Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register('image', {
                required: isEditSession ? false : 'This field is required',
              })}
            />
            {errors.image && (
              <div className={styles.errorMsg}>{errors.image.message}</div>
            )}
          </div>
          <div>
            <label>Description of Event</label>
            <textarea
              className={styles.formContainerTextarea}
              id="desc"
              disabled={isWorking}
              {...register('description', {
                required: 'This field is required',
              })}
            ></textarea>
            {errors.description && (
              <div className={styles.errorMsg}>{errors.description.message}</div>
            )}
          </div>
        </div>
        <div className={styles.formContainerTerms}>
          <input type="checkbox" id="termsCondition" />
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
            {isEditSession ? 'Edit Event' : 'Submit Event'}
          </Button>
          <Button
            type="reset"
            className={styles.btnEvents}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
