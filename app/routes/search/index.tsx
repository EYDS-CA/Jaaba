import { JobPosting, SearchFilter } from '~/components';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { manager } from '~/managers';

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const parentId = data.get('parentId') ?? '';
  switch (request.method) {
    case 'POST': {
      return await manager.CreateTicket('title', 'body', parentId.toString());
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
        {tickets.map((ticket: any) => (
          <JobPosting ticket={ticket} key={ticket.issueKey} />
        ))}
      </div>
    </>
  );
}
