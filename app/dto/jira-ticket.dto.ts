export class JiraTicket {
    title: string;
    body: string;
    requestBody: any = {
        "update": {},
        "fields": {
            "summary": "",
            "issuetype": {
                "id": "10001" // 10001: task
            },
            // "parent": {},
            "project": {
                "id": process.env.JIRA_PROJECT_ID
            },
            "description": {
                "type": "doc",
                "version": 1,
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "text": "",
                                "type": "text"
                            }
                        ]
                    }
                ]
            }
        }
    };

    constructor(
        title: string,
        body: string
    ) {
        this.title = title;
        this.body = body;
    }

    getRequestBody() {
        this.requestBody.fields.summary = this.title;

        return this.requestBody;
    }


}