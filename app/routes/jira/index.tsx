import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { manager } from '~/managers';
import invariant from 'tiny-invariant';

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
  return await manager.GetTickets();
};
