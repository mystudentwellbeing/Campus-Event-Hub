import EventTableOperations from '../features/admin/EventTableOperations';
import EventTable from '../features/admin/EventTable';
import styles from './AdminEventManagement.module.css';

const AdminEventManagement = () => {
  return (
    <main>
      <div className={styles.mainContainer}>
        <EventTableOperations />
        <EventTable />
      </div>
    </main>
  );
};

export default AdminEventManagement;
