import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { Link } from 'react-router-dom';
import { Button, SalaryRange } from '~/components';
import type { IJobPosting } from '~/dto/jira-ticket.dto';
import { manager } from '~/managers';
import invariant from 'tiny-invariant';
import { getProfileFromLocalStorage } from '~/util/profile.util';

const JiraDescriptionElement: React.FC<{ jiraElement: any }> = ({
  jiraElement,
}) => {
  switch (jiraElement?.type) {
    case 'paragraph':
      return <p className='mb-7'>{jiraElement.content[0].text}</p>;
    case 'heading':
      return (
        <h1 className='text-xl font-semibold mb-3'>
          {jiraElement.content[0].text}
        </h1>
      );
    default:
      return null;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const email = form.get('email');
  const letter = form.get('letter');

  const errorMessage = 'Please fill out your profile before applying.';
  invariant(typeof name === 'string', errorMessage);
  invariant(typeof email === 'string', errorMessage);
  invariant(typeof letter === 'string', errorMessage);

  const data = await request.formData();
  const parentId = data.get('parentId') ?? '';
  switch (request.method) {
    case 'POST': {
      return await manager.CreateTicket(
        { name, email, letter },
        parentId.toString(),
      );
    }
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  return manager.GetTicket(params.postingId || '');
};

export default function Posting() {
  const transition = useTransition();
  const ticket = useLoaderData<IJobPosting>();
  const currentProfile = getProfileFromLocalStorage();

  const isSubmitting = transition.state === 'submitting';

  return (
    <div className='p-3 mb-20'>
      <p className='text-gray-500 flex items-center gap-1'>
        <Link to='/search' className='hover:underline'>
          Job Search
        </Link>{' '}
        <FontAwesomeIcon icon={faAngleRight} className='w-4 h-4' />{' '}
        <span className='font-semibold'>{ticket.title}</span>
      </p>

      <div className='flex justify-end '>
        <Link
          to='/search'
          className='border py-1 px-2 rounded border-purple-800 text-purple-800 font-semibold hover:underline'
        >
          <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4 mr-2' />
          Back to Job Search
        </Link>
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-3/4'>
          <h1 className='text-center text-2xl mb-20 font-semibold'>
            {ticket.title}
          </h1>

          <div className='flex justify-between items-center mb-9'>
            <div className='flex flex-col gap-1'>
              <p>
                <span className='font-bold'>City: </span>
                {ticket.customFields.location}
              </p>
              <p>
                <span className='font-bold'>Closing Date: </span>
                {new Date(ticket.customFields.closingDate).toLocaleDateString()}
              </p>
              <p>
                <span className='font-bold'>Salary Range: </span>
                <SalaryRange
                  min={ticket.customFields.salaryMin}
                  max={ticket.customFields.salaryMax}
                />
              </p>
            </div>
            <Form method='post'>
              <input type='hidden' name='parentId' value={ticket.issueId} />
              <input type='hidden' name='name' value={currentProfile?.name} />
              <input type='hidden' name='email' value={currentProfile?.email} />
              <input
                type='hidden'
                name='letter'
                value={currentProfile?.letter}
              />
              <Button type='submit' loading={isSubmitting}>
                Apply now
              </Button>
            </Form>
          </div>

          {ticket.description?.content.map((element: any, index: number) => (
            <JiraDescriptionElement key={index} jiraElement={element} />
          ))}

          <Form method='post' className='w-full flex justify-center'>
            <input type='hidden' name='parentId' value={ticket.issueId} />
            <input type='hidden' name='name' value={currentProfile?.name} />
            <input type='hidden' name='email' value={currentProfile?.email} />
            <input type='hidden' name='letter' value={currentProfile?.letter} />
            <Button type='submit' loading={isSubmitting}>
              Apply now
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
