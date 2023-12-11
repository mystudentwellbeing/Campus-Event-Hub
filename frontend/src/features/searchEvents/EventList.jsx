import { useSearchParams } from 'react-router-dom';
import useEvents from './useEvents';
import Event from '../Event';
import Loader from '../../ui/Loader';
import styles from './EventList.module.css';

const EventList = () => {
  const { isLoading, events, error } = useEvents();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading events: {error.message}</div>;

  const filteredEvents = events.filter((event) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const name = event.name?.toLowerCase() || '';
    const description = event.description?.toLowerCase() || '';
    const city = event.city?.toLowerCase() || '';
    const format = event.event_format?.toLowerCase() || '';
    const school = event.name_of_inst?.toLowerCase() || '';
    const type = event.type?.map((t) => t.toLowerCase()) || [];

    return (
      name.includes(lowerCaseSearchQuery) ||
      description.includes(lowerCaseSearchQuery) ||
      city.includes(lowerCaseSearchQuery) ||
      format.includes(lowerCaseSearchQuery) ||
      school.includes(lowerCaseSearchQuery) ||
      type.some((t) => t.includes(lowerCaseSearchQuery))
    );
  });

  const sortBy = searchParams.get('sortBy') || 'date-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let sortedEvents = filteredEvents;
  if (field === 'date') {
    sortedEvents = [...filteredEvents].sort(
      (a, b) => (new Date(a[field]) - new Date(b[field])) * modifier
    );
  } else if (field === 'price') {
    sortedEvents = [...filteredEvents].sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  } else {
    sortedEvents = [...filteredEvents].sort(
      (a, b) =>
        a[field].toLowerCase().localeCompare(b[field].toLowerCase()) * modifier
    );
  }

  return (
    <section className={styles.eventContainer}>
      {sortedEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </section>
  );
};

export default EventList;
