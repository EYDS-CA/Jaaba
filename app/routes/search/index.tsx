import { JobOpenings, SearchFilter } from '~/components';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { manager } from '~/managers';

// a loader and an action
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
    <div className='ml-60 h-full bg-white'>
      <div className='pt-4 px-7'>
        <SearchFilter />
      </div>
      <div className='pt-8 px-7'>
        <JobOpenings tickets={tickets} count={count} />
      </div>
    </div>
  );
}
