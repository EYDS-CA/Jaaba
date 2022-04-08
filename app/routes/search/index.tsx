import { JobOpenings, SearchFilter } from '~/components';

export default function Index() {
  return (
    <div className='ml-60 h-full bg-white'>
      <div className='pt-4 px-7'>
        <SearchFilter />
      </div>
      <div className='pt-8 px-7'>
        <JobOpenings />
      </div>
    </div>
  );
}
