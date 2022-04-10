export enum ISSUE_TYPES {
  TASK = '10001',
  EPIC = '10002',
  SUBTASK = '10003',
}
export const CUSTOM_FIELDS = {
  closingDate: 'customfield_10039',
  salaryMin: 'customfield_10040',
  salaryMax: 'customfield_10041',
  location: 'customfield_10042',
};

export interface IJobPosting {
  title: string;
  issueTypeId: string;
  issueId: string;
  issueKey: string;
  customFields: {
    closingDate: string;
    salaryMin: number;
    salaryMax: number;
    location: string;
  };
  dateCreated: string;
  status: {
    name: string;
    id: string;
  };
  description: any;
}

export class JiraTicket {
  title: string;
  body: string;
  parentID: string;

  requestBody: any = {
    update: {},
    fields: {
      summary: '',
      issuetype: {
        id: ISSUE_TYPES.TASK,
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
      this.requestBody.fields.issuetype.id = ISSUE_TYPES.SUBTASK;
      this.requestBody.fields.parent = { id: this.parentID };
    }
    this.requestBody.fields.description.content[0].content[0].text = this.body;

    return this.requestBody;
  }

  static parseJSON(jsonData: any): IJobPosting {
    const issueData = {
      title: jsonData.fields.summary,
      issueTypeId: jsonData.fields.issuetype.id,
      issueId: jsonData.id,
      issueKey: jsonData.key,
      customFields: {
        closingDate: jsonData.fields?.[CUSTOM_FIELDS.closingDate],
        salaryMin: parseInt(jsonData.fields?.[CUSTOM_FIELDS.salaryMin]),
        salaryMax: parseInt(jsonData.fields?.[CUSTOM_FIELDS.salaryMax]),
        location: jsonData.fields?.[CUSTOM_FIELDS.location],
      },
      dateCreated: jsonData.updated,
      status: {
        name: jsonData.fields.status.name,
        id: jsonData.fields.status.id,
      },
      description: jsonData.fields.description,
    };

    return issueData;
  }
}
