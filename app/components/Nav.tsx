import {
  faSearch,
  faTableList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { title: 'Job Search', path: '/search', icon: faSearch },
  { title: 'My Job Applications', path: '/applications', icon: faTableList },
  { title: 'My Profile', path: '/', icon: faUser },
];

const baseClass = `flex justify-left items-center px-2 py-4 h-12 font-semibold rounded-md`;

const active = `text-white bg-violet-600 ${baseClass}`;
const inactive = `text-gray-400 ${baseClass}`;

export const Nav: React.FC = () => {
  return (
    <div className='w-60 h-full shadow-lg bg-indigo-800 px-1 py-4 absolute'>
      <ul className='mt-20'>
        {navLinks.map(({ title, path, icon }) => (
          <li
            key={title}
            className={`my-2 rounded-lg hover:text-white hover:bg-violet-600`}
          >
            <NavLink
              className={({ isActive }: any) => (isActive ? active : inactive)}
              to={path}
            >
              <FontAwesomeIcon icon={icon} className='h-4 w-4 pr-3' />
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
