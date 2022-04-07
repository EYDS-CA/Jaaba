// TODO: CRUD operations go here

import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { btoa } from '@remix-run/node/base64';
import dummyData from 'dummy.json';

// /put/post/get/delete RESTful architecture
export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'POST': {
      console.log('hey');
      return await CreateTicket();
    }
  }
};

export const loader: LoaderFunction = async () => {
  return await GetMetaData();
};

export const GetMetaData = async () => {
  const res = await fetch(
    'https://jaaba.atlassian.net/rest/api/3/issue/createmeta',
    {
      method: 'GET',
      headers: new Headers({
        Authorization:
          'Basic ' +
          btoa(`${process.env.JIRA_USERNAME}:${process.env.JIRA_API_KEY}`),
      }),
    },
  );

  const response = await res.json();

  return { projectId: response.projects[0].id, issueType: '100001' };
};

export const CreateTicket = async () => {
  const res = await fetch('https://jaaba.atlassian.net/rest/api/3/issue', {
    method: 'POST',
    headers: new Headers({
      Authorization:
        'Basic ' +
        btoa(`${process.env.JIRA_USERNAME}:${process.env.JIRA_API_KEY}`),
      'content-type': 'application/json',
    }),
    body: JSON.stringify(dummyData),
  });

  return res;
};
