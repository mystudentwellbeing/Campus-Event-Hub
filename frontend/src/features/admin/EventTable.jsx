import { useSearchParams } from 'react-router-dom';
import EventRow from './EventRow';
import useAllEvents from './useAllEvents';
import Table from '../../ui/Table';
import Loader from '../../ui/Loader';
import Pagination from '../../ui/Pagination';

const EventTable = () => {
  const { events, isLoading, error, count } = useAllEvents();
  const [searchParams] = useSearchParams();
  const currentDate = new Date();

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading events: {error.message}</div>;

  const filterValue = searchParams.get('status') || 'all';
  let filteredEvents = events.filter(
    (event) => new Date(event.date) >= currentDate
  );
  if (filterValue === 'approved')
    filteredEvents = events.filter((event) => event.is_approved === true);
  if (filterValue === 'pending')
    filteredEvents = events.filter((event) => event.is_approved === false);
  if (filterValue === 'past')
    filteredEvents = events.filter(
      (event) => new Date(event.date) <= currentDate
    );

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
  }

  return (
    <Table>
      <Table.Header>
        <th></th>
        <th>Date</th>
        <th>Name</th>
        <th>Institution</th>
        <th>City</th>
        <th>Price</th>
        <th>Status</th>
        <th></th>
      </Table.Header>
      <Table.Body
        data={sortedEvents}
        render={(event) => <EventRow key={event.id} event={event} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
};

export default EventTable;
