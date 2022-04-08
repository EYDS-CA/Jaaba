import { Form } from '@remix-run/react';

export const JobApplications: React.FC = () => {
  return (
    <div className='w-full h-full bg-white'>
      <div className='pt-4 px-7'>
        <span className='font-bold text-2xl'>My Job Applications</span>
        <span className='font-semibold text-md py-5 block'>
          View the status of an application
        </span>
        <Form method='post'>
          <label htmlFor='case-number' />
          <input
            className='border border-gray-300 rounded p-2 md:w-96'
            type='text'
            name='case-number'
            placeholder='Enter case number'
          />
          <button className='ml-2 rounded px-8 py-2 bg-indigo-800 text-white pointer-events-none'>
            Search
          </button>
        </Form>
      </div>
    </div>
  );
};
