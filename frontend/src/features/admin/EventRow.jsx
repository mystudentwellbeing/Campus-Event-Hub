import Table from '../../ui/Table';
// import Menus from '../../ui/Menus';
import styles from './EventRow.module.css';

const EventRow = ({ event }) => {
  return (
    <Table.Row>
      <img src={event.image} className={styles.imgSmall} />
      <td>{event.date}</td>
      <td>{event.name}</td>
      <td>{event.institution}</td>
      <td>{event.city}</td>
      <td>{event.price}</td>
      <td>{event.is_approved}</td>
      {/* <td>
        <Menus>
          <Menus.Toggle />
          <Menus.List>
            <Menus.Button>Edit</Menus.Button>
            <Menus.Button>Delete</Menus.Button>
          </Menus.List>
        </Menus>
      </td> */}
    </Table.Row>
  );
};

export default EventRow;
