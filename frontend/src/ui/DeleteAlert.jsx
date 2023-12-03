import { useDeleteEvent } from '../features/submitEvents/useDeleteEvent';
import Button from './Button';
import styles from './DeleteAlert.module.css';

const DeleteAlert = ({ eventId, onCloseModal }) => {
  const { deleteEvent } = useDeleteEvent();
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteEvent(eventId);
    onCloseModal();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCloseModal();
  };
  return (
    <div className={styles.deleteAlert}>
      <h3>Are you sure you want to delete?</h3>
      <div className={styles.buttonWrapper}>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default DeleteAlert;
