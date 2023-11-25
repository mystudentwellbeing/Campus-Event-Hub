// import { useEffect, useRef } from 'react';
// import useEvents from '../hooks/useEvents';
import styles from './Search.module.css';

const Search = () => {
  // const { query, setQuery } = useEvents();
  // const inputEl = useRef(null);

  // useEffect(() => {
  //   const callback = (e) => {
  //     if (document.activeElement === inputEl.current) return;

  //     if (e.code === 'Enter') {
  //       inputEl.current.focus();
  //     }
  //   };
  //   document.addEventListener('keydown', callback);
  //   return () => document.removeEventListener('keydown', callback);
  // }, []);

  return (
    <div className={styles.searchContainer}>
      {/* <input
        className={styles.searchBox}
        type="text"
        placeholder="Search Events"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      /> */}
    </div>
  );
};

export default Search;
