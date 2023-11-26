import { forwardRef } from 'react';

import { kebabCase } from '../../../utilities/text-helpers';

export interface InputProps {
  label: string;
  id?: string;
  name?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      autoComplete,
      name = kebabCase(label),
      id = kebabCase(label),
      type = 'text',
      required = false,
      className = 'relative block w-full appearance-none rounded-md border border-lightgrey border-opacity-40 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          required={required}
          className={className}
          placeholder={placeholder || label}
          autoComplete={autoComplete}
        />
      </>
    );
  }
);

export default Input;
