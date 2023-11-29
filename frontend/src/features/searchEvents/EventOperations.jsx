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
import Search from '../../ui/Search';
import FilterEvent from '../../ui/FilterEvent';
import SortBy from '../../ui/SortBy';
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
      <FilterEvent
        filterfield="type"
        options={[
          {
            value: 'NETWORKING',
            icon: <GrGroup className={styles.filterIcon} />,
          },
          { value: 'CAMPUS', icon: <LuSchool className={styles.filterIcon} /> },
          {
            value: 'CULTURAL',
            icon: <IoEarthOutline className={styles.filterIcon} />,
          },
          {
            value: 'HOBBIES',
            icon: <MdOutlineHeadset className={styles.filterIcon} />,
          },
          {
            value: 'SPORTS',
            icon: <MdOutlineSportsBasketball className={styles.filterIcon} />,
          },
          {
            value: 'EDUCATIONAL',
            icon: <SlGraduation className={styles.filterIcon} />,
          },
          {
            value: 'NIGHTLIFE',
            icon: <MdNightlife className={styles.filterIcon} />,
          },
          {
            value: 'ARTS',
            icon: <MdOutlineColorLens className={styles.filterIcon} />,
          },
          {
            value: 'WELLBEING',
            icon: <LuFlower2 className={styles.filterIcon} />,
          },
        ]}
      />
    </section>
  );
};

export default EventOperations;
