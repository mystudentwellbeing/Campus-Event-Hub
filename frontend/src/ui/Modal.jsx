import { createPortal } from 'react-dom';
import Button from './Button';
import styles from './Modal.module.css';

const Modal = ({ title, children, onClose }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h3>{title}</h3>}
        <Button type="close" onClick={handleCloseClick}>
          &times;
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
