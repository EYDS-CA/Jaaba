import { btoa } from '@remix-run/node/base64';
import { JiraTicket } from '~/dto/jira-ticket.dto';

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

export const CreateTicket = async (title: string, body: string) => {
  const jiraTicket = new JiraTicket(title, body);
  const res = await fetch('https://jaaba.atlassian.net/rest/api/3/issue', {
    method: 'POST',
    headers: new Headers({
      Authorization:
        'Basic ' +
        btoa(`${process.env.JIRA_USERNAME}:${process.env.JIRA_API_KEY}`),
      'content-type': 'application/json',
    }),
    body: JSON.stringify(jiraTicket.getRequestBody()),
  });

  return res;
};

export const GetTickets = async () => {
  const res = await fetch(
    API_BASE_URL + `search?jql=project=${process.env.JIRA_PROJECT_NAME}`,
    {
      method: 'GET',
      headers: new Headers({
        Authorization:
          'Basic ' +
          btoa(`${process.env.JIRA_USERNAME}:${process.env.JIRA_API_KEY}`),
        'content-type': 'application/json',
      }),
    },
  );
  // res has startAt, maxResults, and total (as in length, count) fields as well
  const data = await res.json();
  return [data.issues, data.total];
};
