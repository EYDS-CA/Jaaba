import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { JobOpeningList } from '~/components';
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
    <div className='ml-60 h-full overflow-y-auto'>
      <JobOpeningList tickets={tickets} count={count} />
    </div>
  );
}
