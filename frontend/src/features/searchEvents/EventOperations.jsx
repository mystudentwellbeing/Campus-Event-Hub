import Search from '../../ui/Search';
import SortBy from '../../ui/SortBy';
import Filter from './Filter';
import styles from './EventOperations.module.css';

const EventOperations = () => {
  return (
    <section className={styles.operationContainer}>
      <div className={styles.searchAndSortWrapper}>
        <Search />
        <SortBy
          options={[
            { value: 'date-asc', label: 'Sort by date (Old to New)' },
            { value: 'date-desc', label: 'Sort by date (New to Old)' },
            { value: 'price-asc', label: 'Sort by price (Low to High)' },
            { value: 'price-desc', label: 'Sort by price (High to Low)' },
          ]}
        />
      </div>
      <Filter />
    </section>
  );
};

export default EventOperations;
