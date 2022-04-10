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
        className='block h-8 w-52 rounded border border-gray-300 px-2'
      >
        <option disabled value='0'></option>
        <option value='1'>Value 1</option>
        <option value='2'>Value 2</option>
        <option value='3'>Value 3</option>
      </select>
    </>
  );
};
