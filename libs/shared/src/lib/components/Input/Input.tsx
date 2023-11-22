/* eslint-disable-next-line */
export interface InputProps {
  id: string;
  lable: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

export function Input({
  id,
  lable,
  name,
  type = 'text',
  required = false,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {lable}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={type}
        required={required}
        className="relative block w-full appearance-none rounded-md  border border-lightgrey border-opacity-40 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder || lable}
      />
    </div>
  );
}

export default Input;
