import { useSearchParams } from 'react-router-dom';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import styles from './Pagination.module.css';

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const PAGE_SIZE = 10;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  return (
    <td className={styles.paginationContainer}>
      <p className={styles.paginationText}>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </p>

      <div className={styles.buttonWrapper}>
        <button
          className={styles.pageBtn}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <MdOutlineArrowBackIos /> <span>Previous</span>
        </button>

        <button
          className={styles.pageBtn}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </td>
  );
};

export default Pagination;
