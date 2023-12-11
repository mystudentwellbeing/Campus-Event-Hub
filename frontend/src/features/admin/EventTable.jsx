import { useSearchParams } from 'react-router-dom';
import EventRow from './EventRow';
import useAllEvents from './useAllEvents';
import Table from '../../ui/Table';
import Loader from '../../ui/Loader';
import Pagination from '../../ui/Pagination';

const EventTable = () => {
  const { events, isLoading, error, count } = useAllEvents();
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
        data={filteredEvents}
        render={(event) => <EventRow key={event.id} event={event} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
};

export default EventTable;
