import * as JiraManager from './jira';
// TODO: we want to find out what our backend service is and create the appropriate manager,
// but right now the only option is JiraManager. Allowing it to possibly be null IS NOT ALLOWED
export const manager =
  process.env.BACKEND_SERVICE === 'jira' ? JiraManager : JiraManager;
