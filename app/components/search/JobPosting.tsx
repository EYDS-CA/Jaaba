import { Form, Link } from '@remix-run/react';
import type { IJobPosting } from '~/dto/jira-ticket.dto';
import { SalaryRange } from '~/components';

interface IProps {
  ticket: IJobPosting;
}

export const JobPosting: React.FC<IProps> = ({ ticket }) => {
  return (
    <div className='border-2 border-gray-300 rounded text-sm px-4 py-3 flex justify-between'>
      <div className='flex flex-col gap-2'>
        <Link
          to={ticket.issueKey}
          className='text-base font-semibold text-violet-700 underline'
        >
          {ticket.title}
        </Link>
        <p>
          Closing Date:{' '}
          {new Date(ticket.customFields.closingDate).toLocaleDateString()}
        </p>
        <p>
          <SalaryRange
            min={ticket.customFields.salaryMin}
            max={ticket.customFields.salaryMax}
          />
        </p>
      </div>

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
