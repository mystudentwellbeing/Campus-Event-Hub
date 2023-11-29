import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useEvents from '../features/searchEvents/useEvents';
import styles from './FilterEvent.module.css';

const FilterEvent = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events } = useEvents();
  const initialFilters = searchParams.get('filters')?.split(',') || [];
  const [filters, setFilters] = useState(initialFilters);

  const eventCountsByType = events?.reduce((acc, event) => {
    event.type.forEach((type) => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {});

  if (!eventCountsByType) {
    return <div>Error: Event counts not available.</div>;
  }

  const toggleFilter = (filterType) => {
    setFilters((prevFilters) => {
      let newFilters;
      if (prevFilters.includes(filterType)) {
        newFilters = prevFilters.filter((f) => f !== filterType);
      } else {
        newFilters = [...prevFilters, filterType];
      }

      setTimeout(() => {
        if (newFilters.length > 0) {
          setSearchParams({ filters: newFilters.join(',') }, { replace: true });
        } else {
          setSearchParams({}, { replace: true });
        }
      }, 0);

      return newFilters;
    });
  };

  const isActive = (filterType) => filters.includes(filterType);

  return (
    <div className={styles.filterContainer}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => toggleFilter(option.value)}
          className={
            isActive(option.value) ? styles.activeFilter : styles.filterBtn
          }
        >
          {option.icon}
          {option.value} ({eventCountsByType[`${option.value}`] || 0})
        </button>
      ))}
    </div>
  );
};

export default FilterEvent;
