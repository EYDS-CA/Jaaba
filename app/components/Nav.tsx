import {
  faSearch,
  faTableList,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@remix-run/react';

const navLinks = [
  { title: 'Job Search', path: '/', icon: faSearch },
  { title: 'My Job Applications', path: '/applications', icon: faTableList },
  { title: 'My Profile', path: '/', icon: faUser },
];

const isActive = `text-white bg-violet-600`;
const isInactive = `text-gray-400`;

export const Nav: React.FC = () => {
  return (
    <div className='w-60 h-full shadow-lg bg-indigo-800 px-1 py-4 absolute'>
      <ul className='mt-20'>
        {navLinks.map(({ title, path, icon }) => (
          <li
            key={title}
            className={`${
              path == '/applications' ? isActive : isInactive
            } px-1 my-2 rounded-lg hover:text-white hover:bg-violet-600`}
          >
            <Link
              className='flex justify-left items-center px-2 py-4 h-12 font-semibold rounded-md '
              to={path}
            >
              <FontAwesomeIcon icon={icon} className='h-4 w-4 pr-3' />
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
