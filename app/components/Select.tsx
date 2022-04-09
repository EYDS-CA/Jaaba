interface SelectProps {
  name: string;
}
export const Select: React.FC<SelectProps> = ({ name }) => {
  return (
    <>
      <label className='font-bold text-gray-600' htmlFor={name}>
        {name}
      </label>
      <select
        defaultValue={0}
        name={name}
        className='border border-gray-300 rounded h-8 px-2 block w-52'
      >
        <option disabled value='0'></option>
        <option value='1'>Value 1</option>
        <option value='2'>Value 2</option>
        <option value='3'>Value 3</option>
      </select>
    </>
  );
};
