import { useSearchParams } from 'react-router-dom';
import styles from './Filter.module.css';

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  const handleClick = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterField, value);
    if (newParams.get('page')) newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className={styles.filterContainer}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={
            option.value === currentFilter
              ? styles.activeFilterBtn
              : styles.filterBtn
          }
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
