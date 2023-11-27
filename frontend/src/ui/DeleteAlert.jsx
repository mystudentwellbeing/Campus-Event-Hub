import { useDeleteEvent } from '../features/submitEvents/useDeleteEvent';
import Button from './Button';

const DeleteAlert = ({ eventId, onCloseModal }) => {
  const { deleteEvent } = useDeleteEvent();
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteEvent(eventId);
    onCloseModal();
  };
  return (
    <>
      <h3>Are you sure you want to delete?</h3>
      <div>
        <Button onClick={handleDelete}>Delete</Button>
        <Button>Cancel</Button>
      </div>
    </>
  );
};

export default DeleteAlert;
