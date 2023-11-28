import Search from '../../ui/Search';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import styles from './EventTableOperations.module.css';

const EventTableOperations = () => {
  return (
    <section className={styles.operationContainer}>
      <Search />
      <div className={styles.filterAndSortWrapper}>
        <Filter
          filterField="status"
          options={[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'past', label: 'Past Event' },
          ]}
        />
        <SortBy
          options={[
            { value: 'date-asc', label: 'Sort by date (Old to New)' },
            { value: 'date-desc', label: 'Sort by date (New to Old)' },
            { value: 'price-asc', label: 'Sort by price (Low to High)' },
            { value: 'price-desc', label: 'Sort by price (High to Low)' },
          ]}
        />
      </div>
    </section>
  );
};

export default EventTableOperations;
