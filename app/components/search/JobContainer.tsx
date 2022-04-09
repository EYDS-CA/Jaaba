import { Form } from '@remix-run/react';

const JiraDescriptionElement: React.FC<{ jiraElement: any }> = ({
  jiraElement,
}) => {
  switch (jiraElement?.type) {
    case 'paragraph':
      return <p>{jiraElement.content[0].text}</p>;
    case 'heading':
      return <h1>{jiraElement.content[0].text}</h1>;
    default:
      return null;
  }
};

export const JobContainer: React.FC<any> = ({ ticket }) => {
  return (
    <div className='border-2 border-gray-300 rounded p-3 my-2'>
      <div className='flex'>
        <button className='font-semibold text-violet-800 underline underline-offset-2'>
          {ticket.title}
        </button>
        <span className='text-gray-400 ml-auto'>{ticket.location}</span>
      </div>

      <div className='flex flex-col text-sm text-left '>
        <OpeningField value={ticket.closingDate} />
        <OpeningField value={ticket.salary} />
        <div>
          {ticket.description?.content.map((element: any, index: number) => (
            <JiraDescriptionElement key={index} jiraElement={element} />
          ))}
        </div>
        <div className='ml-auto inline-block'>
          <button className='border-2 border-indigo-700 text-indigo-700 rounded px-5 py-1 mx-1'>
            Save
          </button>
          <Form method='post'>
            <input type='hidden' name='parentId' value={ticket.issueId} />
            <button
              className='border-2 border-indigo-700 bg-indigo-700 text-white rounded px-5 py-1 mx-1'
              type='submit'
            >
              Apply
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

interface FieldProps {
  value: string;
}
export const OpeningField: React.FC<FieldProps> = ({ value }) => {
  return <span className=''>{value}</span>;
};
