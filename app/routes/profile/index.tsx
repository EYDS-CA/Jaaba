import { Form } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { Button } from '~/components';
import { getUserByEmail, saveUserProfile } from '~/models/user.server';
import { useUser } from '~/utils';

export interface IProfile {
  name: string;
  letter: string;
}

interface ActionData {
  errors: {
    name?: string;
    letter?: string;
  };
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

  return saveUserProfile({
    profile: { name, letter },
    email: existingUser.email,
  });
};

export default function Profile() {
  const user = useUser();

  return (
    <div className='w-full px-7 pt-4'>
      <h1 className='mb-5 text-2xl font-bold'>My Profile</h1>

      <Form method='post'>
        <input type='hidden' name='email' value={user.email} />
        <label htmlFor='profile-name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          defaultValue={user.profile?.name}
          className='mb-2 block rounded border border-gray-300 px-2 py-1'
        />
        <label htmlFor='letter'>Cover Letter</label>
        <textarea
          cols={60}
          rows={10}
          name='letter'
          id='letter'
          defaultValue={user.profile?.letter}
          className='mb-2 block rounded border border-gray-300 px-2 py-1'
        />
        <Button type='submit'>Save</Button>
      </Form>
    </div>
  );
}
