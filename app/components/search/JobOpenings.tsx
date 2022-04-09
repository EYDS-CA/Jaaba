import { JobContainer } from './JobContainer';

interface IProps {
  tickets: any[];
  count: number;
}

export const JobOpenings: React.FC<IProps> = ({ tickets, count }) => {
  return (
    <div>
      <span className='font-semibold text-md'>
        Jobs open to the public ({count})
      </span>
      {tickets.map((ticket: any) => (
        <JobContainer ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
};
