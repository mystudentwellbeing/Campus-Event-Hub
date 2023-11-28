import { createContext, useContext, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useOutsideClick from '../hooks/useOutsideClick';
import styles from './Menus.module.css';

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 2,
    });

    openId === '' || openId !== id ? open(id) : close();
  };

  return (
    <button onClick={handleClick} className={styles.moreBtn}>
      <BsThreeDotsVertical />
    </button>
  );
};

const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);
  const listRef = useRef(null);
  useOutsideClick(listRef, close, null);

  if (openId !== id) return null;

  const listStyles = {
    top: `${position.y}px`,
    right: `${position.x}px`,
  };

  return createPortal(
    <ul style={listStyles} className={styles.menuList} ref={listRef}>
      {children}
    </ul>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li className={styles.menuItem}>
      <button onClick={handleClick} className={styles.menuBtn}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
};

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
