import {
  faSearch,
  faTableList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { title: 'Job Search', path: '/search', icon: faSearch },
  { title: 'My Job Applications', path: '/applications', icon: faTableList },
  { title: 'My Profile', path: '/profile', icon: faUser },
];

export const Nav: React.FC = () => {
  return (
    <div className='w-60 flex-shrink-0 bg-indigo-800 px-2'>
      <ul className='mt-32'>
        {navLinks.map(({ title, path, icon }) => (
          <li
            key={title}
            className={`my-2 rounded-lg hover:bg-violet-500 hover:text-white hover:underline`}
          >
            <NavLink
              className={({ isActive }) =>
                classnames(
                  `justify-left flex h-12 items-center rounded-md px-2 py-4 font-semibold text-white`,
                  {
                    'bg-violet-600': isActive,
                  },
                )
              }
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
