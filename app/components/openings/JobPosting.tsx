import type { IJobPosting } from '~/dto/jira-ticket.dto';
import { SalaryRange, Link } from '~/components';
import { Button } from '../Button';
import { useOptionalUser } from '~/utils';

interface IProps {
  ticket: IJobPosting;
}

export const JobPosting: React.FC<IProps> = ({ ticket }) => {
  const user = useOptionalUser();

  return (
    <div className='flex justify-between rounded border-2 border-gray-300 px-4 py-3 text-sm'>
      <div className='flex flex-col gap-2'>
        <Link variant='link' to={ticket.issueKey}>
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
          {user ? (
            <>
              <Button variant='outline' type='button'>
                Save
              </Button>
              <Link variant='solid' to={ticket.issueKey}>
                View
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
