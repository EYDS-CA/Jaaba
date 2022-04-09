import {
  faChevronDown,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UserBar: React.FC = () => {
  return (
    <div className='flex items-center bg-white py-4 mb-1 shadow-md'>
      <div className='ml-auto mr-4 flex items-center '>
        <FontAwesomeIcon
          icon={faUserAstronaut}
          className='text-green-600 h-5 w-5 pr-3'
        />
        <span className='font-semibold text-sm'>
          Jane Butterfly
          <FontAwesomeIcon icon={faChevronDown} className='h-3 w-3 px-3' />
        </span>
      </div>
    </div>
  );
};
