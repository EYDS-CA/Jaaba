import { Fragment } from 'react';
import { JobOpening } from './JobOpening';

interface IProps {
  tickets: any[];
  count: number;
}

export const JobOpeningList: React.FC<IProps> = ({ tickets, count }) => {
  return (
    <Fragment>
      <h1>Jobs open to the public ({count})</h1>
      <div>
        {tickets.map((ticket: any) => {
          return <JobOpening ticket={ticket} key={ticket.key} />;
        })}
      </div>
    </Fragment>
  );
};
