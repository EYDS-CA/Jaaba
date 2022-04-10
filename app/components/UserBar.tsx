import {
  faChevronDown,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UserBar: React.FC = () => {
  return (
    <div className='mb-1 flex items-center bg-white py-4 shadow-md'>
      <div className='ml-auto mr-4 flex items-center '>
        <FontAwesomeIcon
          icon={faUserAstronaut}
          className='h-5 w-5 pr-3 text-green-600'
        />
        <span className='text-sm font-semibold'>
          Jane Butterfly
          <FontAwesomeIcon icon={faChevronDown} className='h-3 w-3 px-3' />
        </span>
      </div>
    </div>
  );
};
