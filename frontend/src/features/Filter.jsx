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
  const { setFilter } = useEvents();

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className={styles.filterContainer}>
      <Button type="filter" onClick={() => handleFilterChange('NETWORKING')}>
        <GrGroup className={styles.filterIcon} />
        NETWORKING
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('CAMPUS')}>
        <LuSchool className={styles.filterIcon} />
        CAMPUS
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('CULTURAL')}>
        <IoEarthOutline className={styles.filterIcon} />
        CULTURAL
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('HOBBIES')}>
        <MdOutlineHeadset className={styles.filterIcon} />
        HOBBIES
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('SPORTS')}>
        <MdOutlineSportsBasketball className={styles.filterIcon} />
        SPORTS
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('EDUCATIONAL')}>
        <SlGraduation className={styles.filterIcon} />
        EDUCATIONAL
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('NIGHTLIFE')}>
        <MdNightlife className={styles.filterIcon} />
        NIGHTLIFE
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('ARTS')}>
        <MdOutlineColorLens className={styles.filterIcon} />
        ARTS
      </Button>
      <Button type="filter" onClick={() => handleFilterChange('WELLBEING')}>
        <LuFlower2 className={styles.filterIcon} />
        WELLBEING
      </Button>
    </div>
  );
};

export default Filter;
