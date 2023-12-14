import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from './../../features/authentication/useUser';
import { useEventInterests } from './useEventInterests';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import Event from '../searchEvents/Event';
import Loader from '../../ui/Loader';
import styles from './MySavedEvents.module.css';

const MySavedEvents = () => {
  const [value, setValue] = useState('savedEvents');
  const navigate = useNavigate();
  const { user } = useUser();
  const { likedEvents, isLoading, error } = useEventInterests(user?.id);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    if (newValue === 'submittedEvents') {
      navigate('/viewmyevents/mysubmittedevents');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className={styles.savedEventsContainer}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="My Saved Events"
          icon={
            <Badge
              badgeContent={likedEvents.length}
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

      <div className={styles.eventsList}>
        {likedEvents && likedEvents.length > 0 ? (
          likedEvents.map((likedEvent) => (
            <Event key={likedEvent.event_id} event={likedEvent.events} />
          ))
        ) : (
          <p>No saved events yet.</p>
        )}
      </div>
    </div>
  );
};

export default MySavedEvents;
