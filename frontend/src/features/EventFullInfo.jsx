import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useEvents from '../hooks/useEvents';
import styles from './EventFullInfo.module.css';

const EventFullInfo = () => {
  const { id } = useParams();
  const { currentEvent, getEventById } = useEvents();

  useEffect(() => {
    getEventById(id);
  }, [id, getEventById]);

  if (!currentEvent) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className={styles.container}>
      <h2>{currentEvent.name_of_event}</h2>
    </main>
  );
};

export default EventFullInfo;
