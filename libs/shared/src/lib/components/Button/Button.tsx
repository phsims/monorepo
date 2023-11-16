import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface ButtonProps {
  id?: string;
  text: string;
  type?: 'button' | 'submit' | 'reset';
  btnClass?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export function Button({
  text,
  type = 'button',
  disabled = false,
  btnClass = 'group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  children,
  id = `${type}-button`,
}: ButtonProps) {
  return (
    <button type={type} className={btnClass} id={id} disabled={disabled}>
      {children}
      {text}
    </button>
  );
}

export default Button;
