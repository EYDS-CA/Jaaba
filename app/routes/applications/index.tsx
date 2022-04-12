import { Form } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import { getUserId } from '~/session.server';

enum ApplicationStatuses {
  OPEN = 'Open',
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/openings');
  return json({});
};

export default function Index() {
  return (
    <div className='h-full w-full bg-white px-7 pt-4'>
      <p className='text-2xl font-bold'>My Job Applications</p>
      <p className='text-md block py-5 font-semibold'>
        View the status of an application
      </p>
      <Form method='post' className='mb-10'>
        <label htmlFor='case-number' />
        <input
          className='rounded border border-gray-300 p-2 md:w-96'
          type='text'
          name='case-number'
          placeholder='Enter case number'
        />
        <button className='pointer-events-none ml-2 rounded bg-indigo-800 px-8 py-2 text-white'>
          Search
        </button>
      </Form>

      <div className='rounded border text-left'>
        <table className='w-full table-fixed'>
          <colgroup>
            <col width='20%' />
            <col width='20%' />
            <col width='20%' />
            <col width='20%' />
            <col width='20%' />
          </colgroup>
          <thead>
            <tr>
              <th className='border-b border-r p-3'>Case Number</th>
              <th className='border-b border-r p-3'>Job Title</th>
              <th className='border-b border-r p-3'>Applied On</th>
              <th className='border-b border-r p-3'>Status</th>
              <th className='border-b p-3'>Updated On</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-r p-3'>JAAB-130</td>
              <td className='border-r p-3'>Software Developer</td>
              <td className='border-r p-3'>
                {new Date().toLocaleDateString()}
              </td>
              <td className='border-r p-3'>
                <ApplicationStatus status={ApplicationStatuses.OPEN} />
              </td>
              <td className='p-3 '>{new Date().toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ApplicationStatusProps {
  status: ApplicationStatuses;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  switch (status) {
    case ApplicationStatuses.OPEN:
      return (
        <span className='rounded bg-gray-300 py-1 px-3 text-black'>
          {status}
        </span>
      );
  }
};
