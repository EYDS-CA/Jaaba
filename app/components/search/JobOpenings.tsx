import { JobContainer } from './JobContainer';

// temporary
const fakeJobs = [
  {
    title: 'Administrative Assistant L6',
    closingDate: '2022-04-07',
    company: 'Canadian Security intelligence Group',
    salary: '$75,000 to $80,000',
    location: 'Ottawa (Ontario)',
  },
  {
    title: 'Application Configuration Analyst',
    closingDate: '2022-04-07',
    company: 'Natural Sciences and Engineering Research Council of Canada',
    salary: '$68,000 to $82,000',
    location: 'Ottawa (Ontario)',
  },
  {
    title: 'Visitor Experience Product Development Officer IV',
    closingDate: '2022-04-07',
    company: 'Parks Canada',
    salary: '$71,000 to $77,000',
    location: 'Various locations',
  },
];

export const JobOpenings: React.FC = () => {
  return (
    <div>
      <span className='font-semibold text-md'>
        Jobs open to the public ({fakeJobs.length})
      </span>

      {fakeJobs.map(({ title, location, closingDate, company, salary }) => (
        <JobContainer
          key={title}
          title={title}
          location={location}
          closingDate={closingDate}
          company={company}
          salary={salary}
        />
      ))}
    </div>
  );
};
