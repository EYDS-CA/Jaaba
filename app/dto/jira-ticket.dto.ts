export class JiraTicket {
  static ISSUE_TYPES: any = {
    TASK: '10001',
    EPIC: '10002',
    SUBTASK: '10003',
  };
  static CUSTOM_FIELDS: any = {
    customfield_10039: 'closingDate', // there's an existing duedate field, could have used that I guess
    customfield_10040: 'salaryMin',
    customfield_10041: 'salaryMax',
    customfield_10042: 'location',
  };

  title: string;
  body: string;
  parentID: string;

  requestBody: any = {
    update: {},
    fields: {
      summary: '',
      issuetype: {
        id: JiraTicket.ISSUE_TYPES.TASK,
      },
      project: {
        id: process.env.JIRA_PROJECT_ID,
      },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: '',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  };

  constructor(title: string, body: string, parentID: string) {
    this.title = title;
    this.body = body;
    this.parentID = parentID;
  }

  getRequestBody() {
    this.requestBody.fields.summary = this.title;
    if (this.parentID) {
      this.requestBody.fields.issuetype.id = JiraTicket.ISSUE_TYPES.SUBTASK;
      this.requestBody.fields.parent = { id: this.parentID };
    }
    this.requestBody.fields.description.content[0].content[0].text = this.body;

    return this.requestBody;
  }

  static parseJSON(jsonData: any) {
    const issueData = {
      title: jsonData.fields.summary,
      issueTypeId: jsonData.fields.issuetype.id,
      issueId: jsonData.id,
      issueKey: jsonData.key,
      dateCreated: jsonData.updated, //could have also gone with .created, but .updated may give employers more freedom to "repost" openings
      status: {
        name: jsonData.fields.status.name,
        id: jsonData.fields.status.id,
      },
      description: JiraTicket.parseDescription(jsonData.fields.description),
    };

    return issueData;
  }

  static parseDescription(jsonDescription: any): string {
    let content = '';
    if (jsonDescription && 'content' in jsonDescription) {
      content = jsonDescription.content
        .map((element: any) => {
          switch (element.type) {
            case 'paragraph':
              return `<p>${element.content[0].text}</p>`;
            case 'heading':
              const level = element.attrs.level + 1;
              return `<h${level}>${element.content[0].text}</h${level}>`;
            default:
              return '';
          }
        })
        .join('');
    }
    return content;
  }
}
