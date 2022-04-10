import React from 'react';
import classnames from 'classnames';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  variant?: 'outline' | 'solid';
  loading?: boolean;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<IProps> = ({
  children,
  variant = 'solid',
  loading,
  disabled,
  type,
}) => {
  return (
    <button
      className={classnames('py-1 px-3 rounded outline-offset-2', {
        'bg-indigo-700 text-white': variant === 'solid',
        'border-indigo-700 bg-white text-indigo-700 border':
          variant === 'outline',
      })}
      disabled={disabled}
      type={type}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className='w-4 h-4 animate-spin' />
      ) : (
        children
      )}
    </button>
  );
};
