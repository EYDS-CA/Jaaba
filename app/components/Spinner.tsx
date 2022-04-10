import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Spinner = () => {
  return <FontAwesomeIcon icon={faSpinner} className='h-5 w-5 animate-spin' />;
};
