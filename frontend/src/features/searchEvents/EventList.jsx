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

  const filterValues = searchParams.get('filters')?.split(',') || [];
  const filteredEvents = events?.filter((event) => {
    const matchesSearch = searchQuery
      ? event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_format?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.name_of_inst?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.some((type) =>
          type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;
    const matchesFilter =
      filterValues.length === 0
        ? true
        : filterValues.some((filter) => event.type.includes(filter));
    return matchesSearch && matchesFilter;
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
