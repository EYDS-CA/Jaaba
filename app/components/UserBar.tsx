import {
  faChevronDown,
  faDoorOpen,
  faUser,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '~/components';
import { useOptionalUser } from '~/utils';
import { Popover } from '@headlessui/react';
import { Form } from '@remix-run/react';
import { Button } from './Button';

export const UserBar: React.FC = () => {
  const user = useOptionalUser();

  return (
    <div className='mb-1 flex items-center bg-white py-4 shadow-md'>
      <div className='mx-8 ml-auto flex items-center '>
        {user ? (
          <>
            <Popover className='relative'>
              <Popover.Button className='flex items-center gap-2 text-sm font-semibold'>
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  className='h-4 w-4 text-green-600'
                />
                {user.email}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className='mr-2 h-3 w-3'
                />
              </Popover.Button>

              <Popover.Panel className='absolute top-7 z-10'>
                <div className='flex flex-col rounded border bg-white '>
                  <Form
                    action='/logout'
                    method='post'
                    className='px-3 py-1 hover:bg-gray-200'
                  >
                    <Button variant='link' type='submit'>
                      <FontAwesomeIcon
                        icon={faDoorOpen}
                        className='mr-2 h-4 w-4'
                        fixedWidth
                      />
                      Logout
                    </Button>
                  </Form>
                </div>
              </Popover.Panel>
            </Popover>
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
