import React from 'react';
import { useState } from 'react';
import { Button } from '~/components';

export interface IProfile {
  name: string;
  email: string;
  letter: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<IProfile>({
    name: '',
    email: '',
    letter: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className='w-full px-7 pt-4'>
      <h1 className='mb-5 text-2xl font-bold'>My Profile</h1>

      <label htmlFor='profile-name'>Name</label>
      <input
        type='text'
        name='name'
        id='name'
        value={profile.name}
        onChange={handleChange}
        className='mb-2 block rounded border border-gray-300 px-2 py-1'
      />
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        name='email'
        id='email'
        value={profile.email}
        onChange={handleChange}
        className='mb-2 block rounded border border-gray-300 px-2 py-1'
      />
      <label htmlFor='letter'>Cover Letter</label>
      <textarea
        cols={60}
        rows={10}
        name='letter'
        id='letter'
        onChange={handleChange}
        className='mb-2 block rounded border border-gray-300 px-2 py-1'
      >
        {profile.letter}
      </textarea>
      <Button type='submit'>Save</Button>
    </div>
  );
}
