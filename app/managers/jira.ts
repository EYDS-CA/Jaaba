import { btoa } from '@remix-run/node/base64';
import { ISSUE_TYPES, JiraTicket } from '~/dto/jira-ticket.dto';

const API_BASE_URL = `https://${process.env.JIRA_PROJECT_NAME}.atlassian.net/rest/api/3/`;

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

  return {
    projectId: response.projects[0].id,
    issueType: ISSUE_TYPES.TASK,
  };
};

export const CreateTicket = async (
  title: string,
  body: string,
  parentId: string,
) => {
  const jiraTicket = new JiraTicket(title, body, parentId);

  const res = await fetch(API_BASE_URL + 'issue', {
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
    // yeah filtering by Task is not working, let's just move on
    // https://community.atlassian.com/t5/Jira-questions/Jira-API-JQL-Search-for-issues-result-only-of-specific-issuetype/qaq-p/1139155
    API_BASE_URL +
      `search?jql=project=${process.env.JIRA_PROJECT_NAME}&issuetype=Task`,
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
  const issues = data.issues
    .filter((issue: any) => issue.fields.issuetype.subtask === false)
    .map((issue: any) => JiraTicket.parseJSON(issue));
  return [issues, data.total];
};
