import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useOutsideClick from '../hooks/useOutsideClick';

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
      y: rect.y + rect.height + 8,
    });

    openId === '' || openId !== id ? open(id) : close();
  };

  return (
    <button onClick={handleClick}>
      <BsThreeDotsVertical />
    </button>
  );
};

const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  const styles = {
    position: 'absolute',
    top: `${position.y}px`,
    right: `${position.x}px`,
    zIndex: 1000,
  };

  return createPortal(
    <ul style={styles} ref={ref}>
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
    <li>
      <button onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
};

Menus.Menu = Menus;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
