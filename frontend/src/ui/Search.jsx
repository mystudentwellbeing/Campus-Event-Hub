import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const handleSearchChange = (event) => {
    setSearchParams({ search: event.target.value });
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Search Events"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
