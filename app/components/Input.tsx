interface InputProps {
  name: string;
  // value:string
}

export const Input: React.FC<InputProps> = ({ name }) => {
  return (
    <>
      <label className='font-bold text-gray-600' htmlFor={name}>
        {name}
      </label>
      <input
        name={name}
        id={name}
        className='border border-gray-300 rounded h-8 px-2 block w-52'
        type='text'
        placeholder=''
      />
    </>
  );
};
