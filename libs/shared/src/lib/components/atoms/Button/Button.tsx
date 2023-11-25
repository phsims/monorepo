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
  btnClass = 'text-xl font-medium bg-primarybg text-primary hover:text-white hover:bg-primary disabled:bg-slate-200 disabled:text-grey disabled:border-slate-500',
  children,
  id = `${type}-button`,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-full p-4 lg:px-8  ${btnClass}`}
      id={id}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
}

export default Button;
