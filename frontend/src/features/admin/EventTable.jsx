import EventRow from './EventRow';
import useAllEvents from './useAllEvents';
import Table from '../../ui/Table';
const EventTable = () => {
  const { events, isLoading, error } = useAllEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;

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
        data={events}
        render={(event) => <EventRow key={event.id} event={event} />}
      />
      {/* <Table.Footer></Table.Footer> */}
    </Table>
  );
};

export default EventTable;
