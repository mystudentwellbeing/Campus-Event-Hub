import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatInstitutionName } from '../../utils/helpers';
import { CgMoreO } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useApproveEvent } from './useApproveEvent';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import DeleteAlert from '../../ui/DeleteAlert';
import styles from './EventRow.module.css';

const EventRow = ({ event }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { approve } = useApproveEvent();

  const handleEdit = () => {
    navigate('/submitevents', { state: { event } });
  };

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleApprove = () => {
    approve({ id: event.id, is_approved: true });
  };

  return (
    <>
      <Table.Row>
        <img src={event.image} className={styles.imgSmall} />
        <td>{event.date}</td>
        <td>{event.name}</td>
        <td>{formatInstitutionName(event.name_of_inst)}</td>
        <td>{event.city}</td>
        <td>$ {event.price}</td>
        <td>
          <span
            className={`${styles.status} ${
              event.is_approved ? styles.approved : styles.pending
            }`}
          >
            {event.is_approved ? 'APPROVED' : 'PENDING'}
          </span>
        </td>
        <td>
          <Menus>
            <Menus.Toggle id={event.id} />
            <Menus.List id={event.id}>
              <Menus.Button
                icon={<CgMoreO className={styles.icon} />}
                onClick={() => navigate(`/events/${event.id}`)}
              >
                Details
              </Menus.Button>
              <Menus.Button
                icon={<BiEdit className={styles.icon} />}
                onClick={handleEdit}
              >
                Edit
              </Menus.Button>
              <Menus.Button
                icon={<RiDeleteBin2Line className={styles.icon} />}
                onClick={handleDeleteClick}
              >
                Delete
              </Menus.Button>

              <Menus.Button
                icon={<FaRegCircleCheck className={styles.icon} />}
                onClick={handleApprove}
              >
                Approve
              </Menus.Button>
            </Menus.List>
          </Menus>
        </td>
      </Table.Row>
      {isModalOpen && (
        <Modal title="Delete Event" onClose={() => setModalOpen(false)}>
          <DeleteAlert
            eventId={event.id}
            onCloseModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default EventRow;
