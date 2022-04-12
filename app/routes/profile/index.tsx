import { Form, useActionData } from '@remix-run/react';
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { Button } from '~/components';
import { getUserByEmail, saveUserProfile } from '~/models/user.server';
import { getUserId } from '~/session.server';
import { useUser } from '~/utils';

interface ActionData {
  errors: {
    name?: string;
    letter?: string;
  };
  response?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const name = formData.get('name');
  const letter = formData.get('letter');

  invariant(typeof email === 'string', 'email is required');

  if (typeof name !== 'string') {
    return json<ActionData>(
      { errors: { name: 'Name is required' } },
      { status: 400 },
    );
  }

  if (typeof letter !== 'string') {
    return json<ActionData>(
      { errors: { name: 'Cover letter is required' } },
      { status: 400 },
    );
  }

  const existingUser = await getUserByEmail(email);

  invariant(existingUser, 'User not found');

  await saveUserProfile({
    profile: { name, letter },
    email: existingUser.email,
  });

  return {
    response: 'Profile successfully updated',
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/openings');
  return json({});
};

export default function Profile() {
  const user = useUser();
  const actionData = useActionData();

  return (
    <div className='w-full px-7 pt-4'>
      <h1 className='mb-5 text-2xl font-bold'>My Profile</h1>

      <Form method='post' className='flex flex-col items-start gap-2'>
        <input type='hidden' name='email' value={user.email} />
        <label htmlFor='profile-name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          defaultValue={user.profile?.name}
          className='block rounded border border-gray-300 px-2 py-1'
        />
        <label htmlFor='letter'>Cover Letter</label>
        <textarea
          cols={60}
          rows={10}
          name='letter'
          id='letter'
          required
          defaultValue={user.profile?.letter}
          className='block rounded border border-gray-300 px-2 py-1'
        />
        <Button type='submit'>Save</Button>
        {actionData?.response ? (
          <p className='inline rounded bg-green-500 px-2 py-1'>
            {actionData.response}
          </p>
        ) : null}
      </Form>
    </div>
  );
}
