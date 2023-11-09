import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface ButtonProps {
  id: string;
  text: string;
  type?: 'button' | 'submit' | 'reset';
  btnClass?: string;
  children?: ReactNode;
}

export function Button({
  id,
  text,
  type = 'button',
  btnClass = 'group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  children,
}: ButtonProps) {
  return (
    <button type={type} className={btnClass} id={id}>
      {children}
      {text}
    </button>
  );
}

export default Button;
