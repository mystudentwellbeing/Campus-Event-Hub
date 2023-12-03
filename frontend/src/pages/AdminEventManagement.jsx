import EventTableOperations from '../features/admin/EventTableOperations';
import EventTable from '../features/admin/EventTable';
import styles from './AdminEventManagement.module.css';

const AdminEventManagement = () => {
  return (
    <main className={styles.adminEventManagement}>
      <EventTableOperations />
      <EventTable />
    </main>
  );
};

export default AdminEventManagement;
