import { Form, useTransition } from '@remix-run/react';
import { Spinner } from './Spinner';

export const JobOpening: React.FC<any> = ({ ticket }) => {
  const transition = useTransition();

  console.log(ticket);

  const isSubmitting = transition.state === 'submitting';
  return (
    <Form method='post' key={ticket.key}>
      <input type='hidden' name='parentId' value={ticket.issueId} />
      <article>
        <h1>{ticket.title}</h1>
        <div>{ticket.description}</div>
      </article>
      <h2>{ticket.key}</h2>
      <button
        type='submit'
        className='p-2 rounded bg-slate-100 shadow-md font-bold flex disabled:opacity-70'
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : 'Apply'}
      </button>
    </Form>
  );
};
