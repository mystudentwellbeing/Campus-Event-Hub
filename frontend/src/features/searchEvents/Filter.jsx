import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import useEvents from './useEvents';
import Button from '../../ui/Button';
import { GrGroup } from 'react-icons/gr';
import { LuSchool, LuFlower2 } from 'react-icons/lu';
import { IoEarthOutline } from 'react-icons/io5';
import {
  MdOutlineHeadset,
  MdOutlineSportsBasketball,
  MdNightlife,
  MdOutlineColorLens,
} from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';
import styles from './Filter.module.css';

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { eventCountsByType } = useEvents();
  const initialFilters = searchParams.get('filters')?.split(',') || [];
  const [filters, setFilters] = useState(initialFilters);

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
      <Button
        type="filter"
        onClick={() => toggleFilter('NETWORKING')}
        className={isActive('NETWORKING') ? styles.activeFilter : ''}
      >
        <GrGroup className={styles.filterIcon} />
        NETWORKING ({eventCountsByType['NETWORKING'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('CAMPUS')}
        className={isActive('CAMPUS') ? styles.activeFilter : ''}
      >
        <LuSchool className={styles.filterIcon} />
        CAMPUS ({eventCountsByType['CAMPUS'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('CULTURAL')}
        className={isActive('CULTURAL') ? styles.activeFilter : ''}
      >
        <IoEarthOutline className={styles.filterIcon} />
        CULTURAL ({eventCountsByType['CULTURAL'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('HOBBIES')}
        className={isActive('HOBBIES') ? styles.activeFilter : ''}
      >
        <MdOutlineHeadset className={styles.filterIcon} />
        HOBBIES ({eventCountsByType['HOBBIES'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('SPORTS')}
        className={isActive('SPORTS') ? styles.activeFilter : ''}
      >
        <MdOutlineSportsBasketball className={styles.filterIcon} />
        SPORTS ({eventCountsByType['SPORTS'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('EDUCATIONAL')}
        className={isActive('EDUCATIONAL') ? styles.activeFilter : ''}
      >
        <SlGraduation className={styles.filterIcon} />
        EDUCATIONAL ({eventCountsByType['EDUCATIONAL'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('NIGHTLIFE')}
        className={isActive('NIGHTLIFE') ? styles.activeFilter : ''}
      >
        <MdNightlife className={styles.filterIcon} />
        NIGHTLIFE ({eventCountsByType['NIGHTLIFE'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('ARTS')}
        className={isActive('ARTS') ? styles.activeFilter : ''}
      >
        <MdOutlineColorLens className={styles.filterIcon} />
        ARTS ({eventCountsByType['ARTS'] || 0})
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('WELLBEING')}
        className={isActive('WELLBEING') ? styles.activeFilter : ''}
      >
        <LuFlower2 className={styles.filterIcon} />
        WELLBEING ({eventCountsByType['WELLBEING'] || 0})
      </Button>
    </div>
  );
};

export default Filter;
