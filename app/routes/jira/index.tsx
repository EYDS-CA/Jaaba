import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { manager } from '~/managers';

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'POST': {
      const parentId = '';
      return await manager.CreateTicket('title', 'body', parentId);
    }
  }
};

export const loader: LoaderFunction = async () => {
  return await manager.GetTickets();
};
