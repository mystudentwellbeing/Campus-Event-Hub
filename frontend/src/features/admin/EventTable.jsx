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
  const searchQuery = searchParams.get('search') || '';

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading events: {error.message}</div>;

  let filteredEvents = events.filter((event) => {
    const matchesStatus = (() => {
      switch (searchParams.get('status')) {
        case 'approved':
          return event.is_approved === true;
        case 'pending':
          return event.is_approved === false;
        case 'past':
          return new Date(event.date) <= currentDate;
        case 'all':
        default:
          return true;
      }
    })();

    const name = event.name || '';
    const description = event.description || '';
    const city = event.city || '';
    const format = event.format || '';
    const school = event.name_of_inst || '';
    const type = event.type || [];

    const matchesSearch = searchQuery
      ? name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        format.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.some((type) =>
          type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    return matchesStatus && matchesSearch;
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
