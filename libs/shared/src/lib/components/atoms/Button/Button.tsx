import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface ButtonProps {
  text?: string;
  id?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export function Button({
  text,
  type = 'button',
  disabled = false,
  className = 'rounded-full p-4 lg:px-8 text-xl font-medium bg-primarybg text-primary hover:text-white hover:bg-primary ',
  children,
  id = `${type}-button`,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} disabled:bg-slate-200 disabled:text-grey disabled:border-slate-500`}
      id={id}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
}

export default Button;
