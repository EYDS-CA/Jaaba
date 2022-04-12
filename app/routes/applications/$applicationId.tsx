import { Form, useLoaderData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import type { IJobPosting } from '~/dto/jira-ticket.dto';
import { manager } from '~/managers';
import { getUserId } from '~/session.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const caseNumber = form.get('case-number');
  invariant(typeof caseNumber === 'string', 'caseNumber is required');
  switch (request.method) {
    case 'POST': {
      return redirect(`/applications/${caseNumber}`);
    }
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/openings');

  invariant(
    typeof params.applicationId === 'string',
    'Application ID should be defined',
  );

  try {
    const application = await manager.GetTicket(params.applicationId);

    return json({ application });
  } catch (err) {
    return json({
      application: {
        issueKey: params.applicationId,
      },
      error: `Couldn't find application with id ${params.applicationId}`,
    });
  }
};

// this is a big ugly duplicate file ><
export default function Application() {
  const { application, error }: { application: IJobPosting; error: string } =
    useLoaderData();

  return (
    <div className='h-full w-full bg-white px-7 pt-4'>
      <p className='text-2xl font-bold'>My Job Applications</p>
      <p className='text-md block py-5 font-semibold'>
        View the status of an application
      </p>
      <Form method='post' className='mb-10'>
        <label htmlFor='case-number' />
        <input
          className='rounded border border-gray-300 p-2 md:w-96'
          type='text'
          name='case-number'
          defaultValue={application.issueKey}
          required
          placeholder='Enter case number'
        />
        <button className='ml-2 rounded bg-indigo-800 px-8 py-2 text-white'>
          Search
        </button>
      </Form>
      {error ? (
        <p className='rounded bg-red-200 p-2 text-red-700'>{error}</p>
      ) : (
        <div className='rounded border text-left'>
          <table className='w-full table-fixed'>
            <colgroup>
              <col width='20%' />
              <col width='20%' />
              <col width='15%' />
              <col width='25%' />
              <col width='15%' />
            </colgroup>
            <thead>
              <tr>
                <th className='border-b border-r p-3'>Case Number</th>
                <th className='border-b border-r p-3'>Job Title</th>
                <th className='border-b border-r p-3'>Applied On</th>
                <th className='border-b border-r p-3'>Status</th>
                <th className='border-b p-3'>Updated On</th>
              </tr>
            </thead>
            <tbody>
              <tr key={application.issueKey}>
                <td className='border-r p-3'>{application.issueKey}</td>
                <td className='border-r p-3'>{application.parent?.title}</td>
                <td className='border-r p-3'>
                  {new Date(application.appliedOn).toLocaleDateString()}
                </td>
                <td className='border-r p-3'>
                  <ApplicationStatus status={application.status} />
                </td>
                <td className='p-3 '>
                  {new Date(application.lastUpdated).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

interface ApplicationStatusProps {
  status: IJobPosting['status'];
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  const color = (() => {
    switch (status?.id) {
      case '10001':
        return 'orange';
      case '10012':
        return 'red';
      case '10013':
        return 'green';
      case '10014':
        return 'purple';
      case '10017':
      case '10015':
        return 'pink';
      case '10016':
        return 'cyan';
      case '10019':
      default:
        return 'green';
    }
  })();

  return (
    <span className={`rounded bg-${color}-200 py-1 px-3 text-${color}-700`}>
      {status?.name}
    </span>
  );
};
