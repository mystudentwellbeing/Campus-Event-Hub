import Filter from '../../ui/Filter';
import styles from './EventTableOperations.module.css';

const EventTableOperations = () => {
  return (
    <section className={styles.operationContainer}>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
        ]}
      />
    </section>
  );
};

export default EventTableOperations;
