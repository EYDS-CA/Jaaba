import { Form } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import { getUserId } from '~/session.server';

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
      <Form method='post'>
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
    </div>
  );
}
