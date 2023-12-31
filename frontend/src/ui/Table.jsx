import { createContext, useContext } from 'react';
import Empty from './Empty';
import styles from './Table.module.css';

const TableContext = createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <table className={styles.table}>{children}</table>
    </TableContext.Provider>
  );
};

const Header = ({ children }) => {
  return <thead className={styles.tableHeader}>{children}</thead>;
};

const Row = ({ children }) => {
  return <tr className={styles.tableRow}>{children}</tr>;
};

const Body = ({ data, render }) => {
  const { columns } = useContext(TableContext);

  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return (
    <tbody className={styles.tableBody}>
      {data.map((item, index) => render(item, index, columns))}
    </tbody>
  );
};

const Footer = ({ children }) => {
  return (
    <tfoot className={styles.tableFooter}>
      <tr>
        <td colSpan="8">{children}</td>
      </tr>
    </tfoot>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
