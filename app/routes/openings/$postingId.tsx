import {
  faAngleRight,
  faArrowLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from '@remix-run/react';
import { Link } from 'react-router-dom';
import { Button, SalaryRange } from '~/components';
import type { IJobPosting } from '~/dto/jira-ticket.dto';
import { manager } from '~/managers';
import invariant from 'tiny-invariant';
import { useOptionalUser } from '~/utils';
import { addApplicationToProfile } from '~/models/user.server';

const JiraDescriptionElement: React.FC<{ jiraElement: any }> = ({
  jiraElement,
}) => {
  switch (jiraElement?.type) {
    case 'paragraph':
      return <p className='mb-7'>{jiraElement.content[0]?.text}</p>;
    case 'heading':
      return (
        <h1 className='mb-3 text-xl font-semibold'>
          {jiraElement.content[0]?.text}
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
      const res = await manager.CreateTicket(
        { name, letter, email },
        parentId.toString(),
      );
      const data = await res.json();

      await addApplicationToProfile(email, {
        applicationKey: data.key,
        openingId: parentId.toString(),
      });

      return {
        response: `Applied successfully, your reference number is ${data.key}`,
      };
    }
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  return manager.GetTicket(params.postingId || '');
};

export default function Posting() {
  const user = useOptionalUser();
  const transition = useTransition();
  const ticket = useLoaderData<IJobPosting>();
  const actionData = useActionData();

  const isSubmitting = transition.state === 'submitting';

  return (
    <div className='mb-20 p-3'>
      <p className='flex items-center gap-1 text-gray-500'>
        <Link to='/openings' className='hover:underline'>
          Job Search
        </Link>{' '}
        <FontAwesomeIcon icon={faAngleRight} className='h-4 w-4' />{' '}
        <span className='font-semibold'>{ticket.title}</span>
      </p>

      <div className='flex justify-end '>
        <Link
          to='/openings'
          className='rounded border border-purple-800 py-1 px-2 font-semibold text-purple-800 hover:underline'
        >
          <FontAwesomeIcon icon={faArrowLeft} className='mr-2 h-4 w-4' />
          Back to Job Search
        </Link>
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-3/4'>
          <h1 className='mb-20 text-center text-2xl font-semibold'>
            {ticket.title}
          </h1>

          <div className='mb-9 flex items-center justify-between'>
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
            {user ? (
              <Form method='post'>
                <input type='hidden' name='parentId' value={ticket.issueId} />
                <input type='hidden' name='name' value={user.profile?.name} />
                <input type='hidden' name='email' value={user?.email} />
                <input
                  type='hidden'
                  name='letter'
                  value={user.profile?.letter}
                />

                {actionData?.response ? (
                  <p className='inline rounded bg-green-500 px-2 py-1 text-white'>
                    <FontAwesomeIcon icon={faCheck} className='mr-2 h-4 w-4' />
                    {actionData.response}
                  </p>
                ) : (
                  <Button type='submit' loading={isSubmitting}>
                    Apply now
                  </Button>
                )}
              </Form>
            ) : null}
          </div>

          {ticket.description ? (
            <>
              {ticket.description?.content.map(
                (element: any, index: number) => (
                  <JiraDescriptionElement key={index} jiraElement={element} />
                ),
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
