import React from 'react';
import classnames from 'classnames';
import { Link as RemixLink } from '@remix-run/react';

interface IProps {
  to: string;
  variant?: 'outline' | 'solid' | 'link';
}

export const Link: React.FC<IProps> = ({ children, to, variant = 'link' }) => {
  return (
    <RemixLink
      to={to}
      className={classnames('rounded  outline-offset-4', {
        'bg-indigo-700 py-1 px-3 text-white': variant === 'solid',
        ' border border-indigo-700 bg-white py-1 px-3 text-indigo-700':
          variant === 'outline',
        'text-indigo-700 underline': variant === 'link',
      })}
    >
      {children}
    </RemixLink>
  );
};
