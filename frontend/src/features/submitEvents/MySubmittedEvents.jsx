import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './../../features/authentication/useUser';
import { useSubmittedEvents } from './useSubmittedEvents';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Event from '../Event';
import Loader from '../../ui/Loader';
import styles from './MySubmittedEvents.module.css';

const MySubmittedEvents = () => {
  const [value, setValue] = useState('submittedEvents');
  const navigate = useNavigate();
  const { user } = useUser();
  const { submittedEvents, isLoading } = useSubmittedEvents(user?.id);

  const myApprovedEvents = submittedEvents?.filter(
    (event) => event.is_approved === true
  );
  const numApprovedEvents = myApprovedEvents?.length;

  const myPendingEvents = submittedEvents?.filter(
    (event) => event.is_approved === false
  );
  const numPendingEvents = myPendingEvents?.length;

  if (isLoading) {
    return <Loader />;
  }

  const handleChange = (e, newValue) => {
    setValue(newValue);
    if (newValue === 'savedEvents') {
      navigate('/viewmyevents/mysavedevents');
    }
  };

  return (
    <div className={styles.container}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="My Saved Events"
          icon={
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1rem',
                  height: '1rem',
                  minWidth: '1rem',
                },
              }}
            >
              <FavoriteIcon fontSize="large" />
            </Badge>
          }
          value="savedEvents"
        />
        <Tab
          label="My Submitted Events"
          icon={<EventIcon fontSize="large" />}
          value="submittedEvents"
        />
      </Tabs>
      <div className={styles.sectionContainer}>
        <section className={styles.status}>
          <h2>
            Approved Events&nbsp;
            <Badge
              badgeContent={numApprovedEvents}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1rem',
                  height: '1rem',
                  minWidth: '1rem',
                },
              }}
            >
              <EventAvailableIcon fontSize="large" />
            </Badge>
          </h2>
          {myApprovedEvents.map((event) => (
            <Event key={event.event_id} event={event} />
          ))}
        </section>
        <section className={styles.status}>
          <h2>
            Pending Events&nbsp;
            <Badge
              badgeContent={numPendingEvents}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1rem',
                  height: '1rem',
                  minWidth: '1rem',
                },
              }}
            >
              <PendingActionsIcon fontSize="large" />
            </Badge>
          </h2>
          {myPendingEvents.map((event) => (
            <Event key={event.event_id} event={event} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MySubmittedEvents;
