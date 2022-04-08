import { Form, useTransition } from '@remix-run/react';
import { Fragment } from 'react';
import { Spinner } from './Spinner';

interface IProps {
  tickets: any[];
  count: number;
}

export const JobOpeningList: React.FC<IProps> = ({ tickets, count }) => {
  const transition = useTransition();

  console.log(tickets);

  const isSubmitting = transition.state === 'submitting';

  return (
    <Fragment>
      <h1>Jobs open to the public ({count})</h1>
      <div>
        {tickets.map((ticket: any) => {
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
        })}
      </div>
    </Fragment>
  );
};
