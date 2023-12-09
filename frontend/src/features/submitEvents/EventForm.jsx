import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../../features/authentication/useUser';
import { useCreateEvent } from './useCreateEvent';
import { useEditEvent } from './useEditEvent';
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TermsConditions from '../../ui/TermsConditionsContent';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import styles from './EventForm.module.css';

const EventForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const eventToEdit = location.state?.event;
  const editId = eventToEdit?.id;
  const isEditSession = Boolean(editId);

  const eventTypeOptions = [
    'ARTS',
    'CAMPUS',
    'COMMUNITY',
    'CULTURAL',
    'EDUCATIONAL',
    'FOOD',
    'HOBBIES',
    'NETWORKING',
    'NIGHTLIFE',
    'SPORTS',
    'WELLBEING',
    'OTHER',
  ];

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...eventToEdit,
          event_format: eventToEdit.event_format || '',
          type: eventTypeOptions.reduce((acc, type) => {
            acc[type] = eventToEdit.type.includes(type);
            return acc;
          }, {}),
        }
      : { type: [], event_format: '' },
  });

  const { user } = useUser();
  const { isCreating, createEvent } = useCreateEvent();
  const { isEditing, editEvent } = useEditEvent();
  const isWorking = isCreating || isEditing;
  const today = new Date();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const navigate = useNavigate();

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    const selectedTypes = Object.entries(data.type)
      // eslint-disable-next-line no-unused-vars
      .filter(([type, isSelected]) => isSelected)
      .map(([type]) => type);

    if (isEditSession)
      editEvent(
        {
          newEventData: {
            ...data,
            type: selectedTypes,
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

  const eventFormat = watch('event_format');

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={styles.formContainer}
    >
      <TextField
        id="contactName"
        label="Contact Name"
        type="text"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('contact_name', {
          required: 'This field is required',
        })}
        error={!!errors.contact_name}
        helperText={errors.contact_name ? errors.contact_name.message : ''}
        variant="outlined"
      />
      <TextField
        id="contactPhone"
        label="Contact Phone"
        type="text"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('contact_phone', {
          required: 'This field is required',
        })}
        error={!!errors.contact_phone}
        helperText={errors.contact_phone ? errors.contact_phone.message : ''}
        variant="outlined"
      />
      <TextField
        id="contactEmail"
        label="Contact Email"
        type="email"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('contact_email', {
          required: 'This field is required',
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Email address must be a valid address',
          },
        })}
        error={!!errors.contact_email}
        helperText={errors.contact_email ? errors.contact_email.message : ''}
        variant="outlined"
      />
      <TextField
        id="nameOfOrg"
        label="Name of Organization (i.e. Student Club)"
        type="text"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('name_of_org', {
          required: 'This field is required',
        })}
        error={!!errors.name_of_org}
        helperText={errors.name_of_org ? errors.name_of_org.message : ''}
        variant="outlined"
      />
      <Controller
        name="name_of_inst"
        control={control}
        defaultValue=""
        rules={{
          required: 'This field is required',
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!error}
          >
            <InputLabel id="nameOfInst-label">Name of Institution</InputLabel>
            <Select
              {...field}
              labelId="nameOfInst-label"
              id="nameOfInst"
              label="Name of Institution"
            >
              <MenuItem value="">
                <em>Select University</em>
              </MenuItem>
              <MenuItem value="University_of_Manitoba">
                University of Manitoba
              </MenuItem>
              <MenuItem value="University_of_Winnipeg">
                University of Winnipeg
              </MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <FormHelperText>{error ? error.message : ''}</FormHelperText>
          </FormControl>
        )}
      />
      <TextField
        id="name"
        label="Name of Event"
        type="text"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('name', {
          required: 'This field is required',
        })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        variant="outlined"
      />
      <div className={styles.eventTypeContainer}>
        <label className={styles.eventTypeLabel}>Event Type</label>
        <FormControl component="fieldset" error={!!errors.type}>
          <div className={styles.eventTypeBox}>
            {eventTypeOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Controller
                    name={`type.${option}`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label={option}
              />
            ))}
          </div>
          <FormHelperText>
            {errors.type ? errors.type.message : ''}
          </FormHelperText>
        </FormControl>
      </div>

      <div className={styles.timeWrapper}>
        <TextField
          id="startTime"
          label="Event Start Time"
          type="time"
          margin="normal"
          fullWidth
          disabled={isWorking}
          {...register('start_time', {
            required: 'This field is required',
          })}
          error={!!errors.start_time}
          helperText={errors.start_time ? errors.start_time.message : ''}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="endTime"
          label="Event End Time"
          type="time"
          margin="normal"
          fullWidth
          disabled={isWorking}
          {...register('end_time', {
            required: 'This field is required',
          })}
          error={!!errors.end_time}
          helperText={errors.end_time ? errors.end_time.message : ''}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <TextField
        id="date"
        label="Date"
        type="date"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('date', {
          required: 'This field is required',
        })}
        error={!!errors.date}
        helperText={errors.date ? errors.date.message : ''}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputProps: { min: today.toISOString().split('T')[0] },
        }}
      />
      <Controller
        name="event_format"
        control={control}
        defaultValue=""
        rules={{
          required: 'This field is required',
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.event_format}
          >
            <InputLabel id="eventFormat-label">Event Format</InputLabel>
            <Select
              {...field}
              labelId="eventFormat-label"
              id="eventFormat"
              label="Event Format"
            >
              <MenuItem value="">
                <em>Select Event Format</em>
              </MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
              <MenuItem value="In-person">In-person</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
            <FormHelperText>{error ? error.message : ''}</FormHelperText>
          </FormControl>
        )}
      />
      {['Virtual', 'Hybrid'].includes(eventFormat) && (
        <TextField
          margin="normal"
          fullWidth
          id="virtualLink"
          label="If virtual - virtual link"
          type="text"
          disabled={isWorking}
          {...register('virtual_link', {
            required: 'This field is required!',
          })}
          error={!!errors.virtual_link}
          helperText={errors.virtual_link ? errors.virtual_link.message : ''}
          variant="outlined"
        />
      )}
      {eventFormat !== 'Virtual' && (
        <>
          <TextField
            margin="normal"
            fullWidth
            id="nameOfVenue"
            label="Name of Venue"
            type="text"
            disabled={isWorking}
            {...register('name_of_venue', {
              required: 'This field is required',
            })}
            error={!!errors.name_of_venue}
            helperText={
              errors.name_of_venue ? errors.name_of_venue.message : ''
            }
            variant="outlined"
          />

          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address(Street No.& Name) of Event"
            type="text"
            disabled={isWorking}
            {...register('address', {
              required: 'This field is required',
            })}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ''}
            variant="outlined"
          />

          <TextField
            margin="normal"
            fullWidth
            id="city"
            label="City"
            type="text"
            disabled={isWorking}
            {...register('city', {
              required: 'This field is required',
            })}
            error={!!errors.city}
            helperText={errors.city ? errors.city.message : ''}
            variant="outlined"
          />

          <TextField
            margin="normal"
            fullWidth
            id="postalCode"
            label="Postal Code"
            type="text"
            disabled={isWorking}
            {...register('postal_code', {
              required: 'This field is required',
            })}
            error={!!errors.postal_code}
            helperText={errors.postal_code ? errors.postal_code.message : ''}
            variant="outlined"
          />
        </>
      )}
      <TextField
        margin="normal"
        fullWidth
        id="price"
        label="Price of Ticket"
        type="number"
        disabled={isWorking}
        {...register('price', {
          required: 'This field is required',
          min: { value: 0, message: 'Price must be 0 or more' },
          step: '0.01',
        })}
        error={!!errors.price}
        helperText={errors.price ? errors.price.message : ''}
        variant="outlined"
        inputProps={{ step: '0.01' }}
      />
      <TextField
        id="shortDesc"
        label="Short Description (150 characters)"
        type="text"
        margin="normal"
        fullWidth
        disabled={isWorking}
        {...register('short_description', {
          required: 'This field is required',
        })}
        error={!!errors.short_description}
        helperText={
          errors.short_description ? errors.short_description.message : ''
        }
        inputProps={{ maxLength: 150 }}
        variant="outlined"
      />
      <TextField
        id="desc"
        label="Description of Event"
        multiline
        rows={6}
        fullWidth
        margin="normal"
        disabled={isWorking}
        {...register('description', {
          required: 'This field is required',
        })}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ''}
        variant="outlined"
      />
      <div className={styles.termsButtonWrapper}>
        <FormControl
          fullWidth
          variant="outlined"
          error={!!errors.image}
          style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}
        >
          <InputLabel htmlFor="outlined-adornment-image">Image</InputLabel>
          <OutlinedInput
            id="outlined-adornment-image"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="file upload"
                  edge="end"
                  component="label"
                  style={{ marginRight: '1rem' }}
                >
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                    {...register('image', {
                      required: isEditSession
                        ? false
                        : 'This field is required',
                    })}
                  />
                  <CloudUploadIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            }
            label="Image"
            value={selectedFile ? selectedFile.name : ''}
          />
          {errors.image && (
            <FormHelperText>{errors.image.message}</FormHelperText>
          )}
        </FormControl>

        <div className={styles.termsWrapper}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('termsCondition', {
                  required: 'Please Check the Box to submit',
                })}
                sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
              />
            }
            label={
              <a onClick={() => setModalOpen((show) => !show)}>
                Terms and Conditions
              </a>
            }
          />
          {errors.termsCondition && (
            <FormHelperText error>
              {errors.termsCondition.message}
            </FormHelperText>
          )}
          {isModalOpen && (
            <Modal
              title="Terms and Conditions"
              onClose={() => setModalOpen(false)}
            >
              <TermsConditions onCloseModal={() => setModalOpen(false)} />
            </Modal>
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit">
            {isWorking ? (
              <SpinnerMini />
            ) : isEditSession ? (
              'Edit Event'
            ) : (
              'Submit Event'
            )}
          </Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
