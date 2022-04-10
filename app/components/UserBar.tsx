import {
  faChevronDown,
  faUser,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '~/components';
import { useOptionalUser } from '~/utils';

export const UserBar: React.FC = () => {
  const user = useOptionalUser();

  console.log({ user });

  return (
    <div className='mb-1 flex items-center bg-white py-4 shadow-md'>
      <div className='mx-8 ml-auto flex items-center '>
        {user ? (
          <>
            <FontAwesomeIcon
              icon={faUserAstronaut}
              className='h-5 w-5 pr-3 text-green-600'
            />
            <span className='text-sm font-semibold'>
              {user.email}
              <FontAwesomeIcon icon={faChevronDown} className='h-3 w-3 px-3' />
            </span>
          </>
        ) : (
          <Link variant='solid' to='/login'>
            <FontAwesomeIcon icon={faUser} className='mr-2 h-4 w-4' />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
