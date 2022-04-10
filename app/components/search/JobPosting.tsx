import { Form, Link, useTransition } from '@remix-run/react';
import type { IJobPosting } from '~/dto/jira-ticket.dto';
import { SalaryRange } from '~/components';
import { getProfileFromLocalStorage } from '~/util/profile.util';
import { Button } from '../Button';

interface IProps {
  ticket: IJobPosting;
}

export const JobPosting: React.FC<IProps> = ({ ticket }) => {
  const currentProfile = getProfileFromLocalStorage();
  const transition = useTransition();
  const isSubmitting = transition.state === 'submitting';

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
          <Button variant='outline' type='button'>
            Save
          </Button>
          <Form method='post'>
            <input type='hidden' name='parentId' value={ticket.issueId} />
            <input type='hidden' name='name' value={currentProfile?.name} />
            <input type='hidden' name='email' value={currentProfile?.email} />
            <input type='hidden' name='letter' value={currentProfile?.letter} />
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              type='submit'
            >
              Apply
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
