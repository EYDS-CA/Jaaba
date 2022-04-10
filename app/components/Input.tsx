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
        className='block h-8 w-52 rounded border border-gray-300 px-2'
        type='text'
        placeholder=''
      />
    </>
  );
};
