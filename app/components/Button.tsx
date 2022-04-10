import React from 'react';
import classnames from 'classnames';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  variant?: 'outline' | 'solid' | 'link';
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
      className={classnames('rounded py-1 px-3 outline-offset-4', {
        'bg-indigo-700 text-white': variant === 'solid',
        'border border-indigo-700 bg-white text-indigo-700':
          variant === 'outline',
        'text-indigo-700': variant === 'link',
      })}
      disabled={disabled}
      type={type}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className='h-4 w-4 animate-spin' />
      ) : (
        children
      )}
    </button>
  );
};
