import { Form } from '@remix-run/react';
import React from 'react';
import { useState } from 'react';
import { Button } from '~/components';

interface IProfile {
  name: string;
  email: string;
  letter: string;
}

const saveProfileToLocalStorage = (submitEvent: any) => {
  if (typeof window === 'undefined') return;
  const formElements = submitEvent.target.elements;
  const name = formElements['name'].value;
  const email = formElements['email'].value;
  const letter = formElements['letter'].value;
  localStorage.setItem('profile', JSON.stringify({ name, email, letter }));
};

const getProfileFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  const profile = localStorage.getItem('profile');
  if (profile) {
    return JSON.parse(profile);
  }
  return {
    name: '',
    email: '',
    letter: '',
  };
};

export default function Profile() {
  const [profile, setProfile] = useState<IProfile>(
    getProfileFromLocalStorage() || {
      name: '',
      email: '',
      letter: '',
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className='w-full pt-4 px-7'>
      <h1 className='text-2xl font-bold mb-5'>My Profile</h1>

      <Form onSubmit={saveProfileToLocalStorage}>
        <label htmlFor='profile-name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={profile.name}
          onChange={handleChange}
          className='border border-gray-300 rounded px-2 py-1 block mb-2'
        />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={profile.email}
          onChange={handleChange}
          className='border border-gray-300 rounded px-2 py-1 block mb-2'
        />
        <label htmlFor='letter'>Cover Letter</label>
        <textarea
          cols={60}
          rows={10}
          name='letter'
          id='letter'
          onChange={handleChange}
          className='border border-gray-300 rounded px-2 py-1 block mb-2'
        >
          {profile.letter}
        </textarea>
        <Button type='submit'>Save</Button>
      </Form>
    </div>
  );
}
