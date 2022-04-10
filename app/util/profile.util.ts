export const saveProfileToLocalStorage = (submitEvent: any) => {
  if (typeof window === 'undefined') return;
  const formElements = submitEvent.target.elements;
  const name = formElements['name'].value;
  const email = formElements['email'].value;
  const letter = formElements['letter'].value;
  localStorage.setItem('profile', JSON.stringify({ name, email, letter }));
};

export const getProfileFromLocalStorage = () => {
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
