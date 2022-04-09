import { Form } from '@remix-run/react';
import type { IJobPosting } from '~/dto/jira-ticket.dto';

// const JiraDescriptionElement: React.FC<{ jiraElement: any }> = ({
//   jiraElement,
// }) => {
//   switch (jiraElement?.type) {
//     case 'paragraph':
//       return <p>{jiraElement.content[0].text}</p>;
//     case 'heading':
//       return <h1>{jiraElement.content[0].text}</h1>;
//     default:
//       return null;
//   }
// };

interface IProps {
  ticket: IJobPosting;
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
});

export const JobPosting: React.FC<IProps> = ({ ticket }) => {
  console.log({ ticket });
  return (
    <div className='border-2 border-gray-300 rounded text-sm px-4 py-3 flex justify-between'>
      <div className='flex flex-col gap-2'>
        <p className='text-base font-semibold text-violet-700 underline'>
          {ticket.title}
        </p>
        <p>
          Closing Date:{' '}
          {new Date(ticket.customFields.closingDate).toLocaleDateString()}
        </p>
        <p>
          {formatter.format(ticket.customFields.salaryMin)} - $
          {formatter.format(ticket.customFields.salaryMax)}
        </p>
      </div>

      {/* {ticket.description?.content.map((element: any, index: number) => (
        <JiraDescriptionElement key={index} jiraElement={element} />
      ))} */}

      <div className='flex flex-col items-end justify-between'>
        <p className='mb-1'>{ticket.customFields.location}</p>

        <div className='flex gap-2'>
          <button className='border-2 border-indigo-700 text-indigo-700 rounded px-5 py-1'>
            Save
          </button>
          <Form method='post'>
            <input type='hidden' name='parentId' value={ticket.issueId} />
            <button
              className='border-2 border-indigo-700 bg-indigo-700 text-white rounded px-5 py-1'
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
