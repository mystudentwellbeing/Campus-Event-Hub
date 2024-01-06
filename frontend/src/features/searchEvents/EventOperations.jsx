import { GrGroup } from 'react-icons/gr';
import { LuSchool, LuFlower2 } from 'react-icons/lu';
import { BsHouseHeart } from 'react-icons/bs';
import { IoEarthOutline, IoFastFoodOutline } from 'react-icons/io5';
import {
  MdOutlineHeadset,
  MdOutlineSportsBasketball,
  MdNightlife,
  MdOutlineColorLens,
} from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';
import { RxFace } from 'react-icons/rx';
import Search from '../../ui/Search';
import FilterBySchools from '../../ui/FilterBySchools';
import FilterEvent from '../../ui/FilterEvent';
import SortBy from '../../ui/SortBy';
import styles from './EventOperations.module.css';

const EventOperations = () => {
  return (
    <section className={styles.operationContainer}>
      <div className={styles.searchSortWrapper}>
        <Search />
        <div className={styles.rightSideWrapper}>
          <FilterBySchools
            filterfield="name_of_inst"
            options={[
              {
                value: 'Assiniboine_Community_College',
                label: 'Assiniboine Community College',
              },
              { value: 'Brandon_University', label: 'Brandon University' },
              {
                value: 'St._Boniface_University',
                label: 'St. Boniface University',
              },
              {
                value: 'University_of_Manitoba',
                label: 'University of Manitoba',
              },
              {
                value: 'University_of_Winnipeg',
                label: 'University of Winnipeg',
              },
              { value: 'Other', label: 'Other' },
            ]}
          />
          <SortBy
            options={[
              { value: 'date-asc', label: 'Sort by date' },
              { value: 'price-asc', label: 'Sort by price (Low to High)' },
              { value: 'price-desc', label: 'Sort by price (High to Low)' },
            ]}
          />
        </div>
      </div>
      <FilterEvent
        filterfield="type"
        options={[
          {
            value: 'ARTS',
            icon: <MdOutlineColorLens className={styles.filterIcon} />,
          },
          {
            value: 'CAMPUS',
            icon: <LuSchool className={styles.filterIcon} />,
          },
          {
            value: 'COMMUNITY',
            icon: <BsHouseHeart className={styles.filterIcon} />,
          },
          {
            value: 'CULTURAL',
            icon: <IoEarthOutline className={styles.filterIcon} />,
          },
          {
            value: 'EDUCATIONAL',
            icon: <SlGraduation className={styles.filterIcon} />,
          },
          {
            value: 'FOOD',
            icon: <IoFastFoodOutline className={styles.filterIcon} />,
          },
          {
            value: 'HOBBIES',
            icon: <MdOutlineHeadset className={styles.filterIcon} />,
          },
          {
            value: 'NETWORKING',
            icon: <GrGroup className={styles.filterIcon} />,
          },
          {
            value: 'NIGHTLIFE',
            icon: <MdNightlife className={styles.filterIcon} />,
          },
          {
            value: 'SPORTS',
            icon: <MdOutlineSportsBasketball className={styles.filterIcon} />,
          },
          {
            value: 'WELLBEING',
            icon: <LuFlower2 className={styles.filterIcon} />,
          },
          {
            value: 'OTHER',
            icon: <RxFace className={styles.filterIcon} />,
          },
        ]}
      />
    </section>
  );
};

export default EventOperations;
