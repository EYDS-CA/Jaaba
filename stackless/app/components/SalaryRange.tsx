import React from 'react';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface IProps {
  min: number;
  max: number;
}

export const SalaryRange: React.FC<IProps> = ({ min, max }) => {
  return (
    <>
      {currencyFormatter.format(min)} - {currencyFormatter.format(max)}
    </>
  );
};
