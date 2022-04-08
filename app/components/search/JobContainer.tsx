interface ContainerProps {
  // temporary
  title: string;
  location: string;
  closingDate: string;
  company: string;
  salary: string;
}

export const JobContainer: React.FC<ContainerProps> = ({
  title,
  location,
  closingDate,
  company,
  salary,
}) => {
  return (
    <div className='border-2 border-gray-300 rounded p-3 my-2'>
      <div className='flex'>
        <button className='font-semibold text-violet-800 underline underline-offset-2'>
          {title}
        </button>
        <span className='text-gray-400 ml-auto'>{location}</span>
      </div>

      <div className='flex flex-col text-sm text-left '>
        <OpeningField value={closingDate} />
        <OpeningField value={company} />
        <OpeningField value={salary} />
        <div className='ml-auto inline-block'>
          <button className='border-2 border-indigo-700 text-indigo-700 rounded px-5 py-1 mx-1'>
            Save
          </button>
          <button className='border-2 border-indigo-700 bg-indigo-700 text-white rounded px-5 py-1 mx-1'>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

interface FieldProps {
  value: string;
}
export const OpeningField: React.FC<FieldProps> = ({ value }) => {
  return <span className=''>{value}</span>;
};
