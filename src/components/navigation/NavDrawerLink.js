import { NavLink } from 'react-router-dom';
import Icon from '../other/Icon';

function NavDrawerLink({ to, icon, text, onClick }) {
  const getLinkClass = ({ isActive }) => {
    return (isActive) ?
      'flex items-center space-x-2 p-2 bg-[rgba(0,_0,_0,_0.4)] rounded-xl duration-200' :
      'flex items-center space-x-2 p-2 rounded-xl duration-200';
  }

  return (
    <NavLink to={to} className={getLinkClass} onClick={onClick}>
      <Icon icon={icon} color="white" />
      <p className="px-4 text-center font-bold text-[white] whitespace-nowrap">{text}</p>
    </NavLink>
  );
}

export default NavDrawerLink;
