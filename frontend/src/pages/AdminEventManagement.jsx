import EventTableOperations from '../features/admin/EventTableOperations';
import EventTable from '../features/admin/EventTable';

const AdminEventManagement = () => {
  return (
    <main>
      <EventTableOperations />
      <EventTable />
    </main>
  );
};

export default AdminEventManagement;
