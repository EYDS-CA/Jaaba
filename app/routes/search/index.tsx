import { JobPosting, SearchFilter } from '~/components';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { manager } from '~/managers';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const email = form.get('email');
  const letter = form.get('letter');

  const errorMessage = 'Please fill out your profile before applying.';
  invariant(typeof name === 'string', errorMessage);
  invariant(typeof email === 'string', errorMessage);
  invariant(typeof letter === 'string', errorMessage);

  const data = await request.formData();
  const parentId = data.get('parentId') ?? '';
  switch (request.method) {
    case 'POST': {
      return await manager.CreateTicket(
        { name, email, letter },
        parentId.toString(),
      );
    }
  }
};

export const loader: LoaderFunction = async () => {
  return manager.GetTickets();
};

export default function Index() {
  const [tickets, count] = useLoaderData();

  return (
    <>
      <div className='pt-4 px-7'>
        <SearchFilter />
      </div>
      <div className='pt-8 px-7'>
        <p className='font-semibold mb-2'>Jobs open to the public ({count})</p>
        <div className='flex flex-col gap-3'>
          {tickets.map((ticket: any) => (
            <JobPosting ticket={ticket} key={ticket.issueKey} />
          ))}
        </div>
      </div>
    </>
  );
}
