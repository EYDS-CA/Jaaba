//TODO: this is the page that makes the call
// should have a loader that calls the jira loader
// form goes here

import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { manager } from '~/managers';

// REPLACE contents of Index() with:
//LOADER
// https://remix.run/docs/en/v1/api/conventions#loader
// - have the loader contact the loader in /jira

// BUTTON

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'POST': {
      return await manager.CreateTicket('title', 'body');
    }
  }
};

export const loader: LoaderFunction = async () => {
  return redirect('/applications');
};
