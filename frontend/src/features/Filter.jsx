import useEvents from '../hooks/useEvents';
import Button from '../ui/Button';
import { GrGroup } from 'react-icons/gr';
import { LuSchool } from 'react-icons/lu';
import { IoEarthOutline } from 'react-icons/io5';
import { MdOutlineHeadset } from 'react-icons/md';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';
import { MdNightlife } from 'react-icons/md';
import { MdOutlineColorLens } from 'react-icons/md';
import { LuFlower2 } from 'react-icons/lu';
import styles from './Filter.module.css';

const Filter = () => {
  const { filters, setFilters } = useEvents();

  const toggleFilter = (filterType) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filterType)
        ? prevFilters.filter((f) => f !== filterType)
        : [...prevFilters, filterType]
    );
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
        NETWORKING
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('CAMPUS')}
        className={isActive('CAMPUS') ? styles.activeFilter : ''}
      >
        <LuSchool className={styles.filterIcon} />
        CAMPUS
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('CULTURAL')}
        className={isActive('CULTURAL') ? styles.activeFilter : ''}
      >
        <IoEarthOutline className={styles.filterIcon} />
        CULTURAL
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('HOBBIES')}
        className={isActive('HOBBIES') ? styles.activeFilter : ''}
      >
        <MdOutlineHeadset className={styles.filterIcon} />
        HOBBIES
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('SPORTS')}
        className={isActive('SPORTS') ? styles.activeFilter : ''}
      >
        <MdOutlineSportsBasketball className={styles.filterIcon} />
        SPORTS
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('EDUCATIONAL')}
        className={isActive('EDUCATIONAL') ? styles.activeFilter : ''}
      >
        <SlGraduation className={styles.filterIcon} />
        EDUCATIONAL
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('NIGHTLIFE')}
        className={isActive('NIGHTLIFE') ? styles.activeFilter : ''}
      >
        <MdNightlife className={styles.filterIcon} />
        NIGHTLIFE
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('ARTS')}
        className={isActive('ARTS') ? styles.activeFilter : ''}
      >
        <MdOutlineColorLens className={styles.filterIcon} />
        ARTS
      </Button>
      <Button
        type="filter"
        onClick={() => toggleFilter('WELLBEING')}
        className={isActive('WELLBEING') ? styles.activeFilter : ''}
      >
        <LuFlower2 className={styles.filterIcon} />
        WELLBEING
      </Button>
    </div>
  );
};

export default Filter;
