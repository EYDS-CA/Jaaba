export interface TicketDTO {
  update: Update;
  fields: Fields;
}

export interface Update {}

export interface Fields {
  summary: string;
  issuetype: Issuetype;
  project: Project;
  description: Description;
}

export interface Issuetype {
  id: string;
}

export interface Project {
  id: number;
}

export interface Description {
  type: string;
  version: number;
  content: Content[];
}

export interface Content {
  type: string;
  content: Content2[];
}

export interface Content2 {
  text: string;
  type: string;
}
