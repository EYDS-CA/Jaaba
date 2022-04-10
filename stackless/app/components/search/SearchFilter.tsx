import { Form } from '@remix-run/react';

import { Input } from '../Input';
import { Select } from '../Select';

export const SearchFilter: React.FC = () => {
  return (
    <>
      <span className='font-bold text-2xl'>Job Search</span>
      <Form method='post'>
        <div className='flex flex-wrap bg-gray-200 p-4 mt-3 rounded-md'>
          <div className='mx-1 my-2'>
            <Input name='Job Title' />
          </div>

          <div className='mx-1 my-2'>
            <Input name='Job Reference Number' />
          </div>
          <div className='mx-1 my-2'>
            <Select name='Organization' />
          </div>
          <div className='mx-1 my-2'>
            <Select name='Job Type' />
          </div>
          <div className='mx-1 my-2'>
            <Select name='Date Posted' />
          </div>
          <div className='mx-1 my-2'>
            <Select name='Language' />
          </div>
          <div className='mx-1 my-2'>
            <Select name='Work Location' />
          </div>
          <div className='mx-1 my-2'>
            <Select name='Minimum Salary' />
          </div>
        </div>
      </Form>
    </>
  );
};
