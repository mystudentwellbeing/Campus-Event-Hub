import { useState, useEffect, useRef } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './Search.module.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;

      if (e.code === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }
    };
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [setQuery]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Search Events"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <FaMagnifyingGlass className={styles.icon} />
    </div>
  );
};

export default Search;
