import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  title?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary border',
  ghost:
    'bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary',
};

export function Button({
  variant = 'primary',
  fullWidth,
  iconLeft,
  iconRight,
  onClick,
  disabled,
  loading,
  type = 'button',
  title,
  ariaLabel,
  ariaDescribedby,
  className = '',
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';
  const variantClass = variantClasses[variant];

  const classes = [baseClasses, variantClass, widthClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      title={title}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {iconLeft && <span className="flex items-center gap-2">{iconLeft}</span>}
      {!loading && <span className="flex items-center gap-2">{title}</span>}
      {loading && <span className="ml-2">Loading...</span>}
      {iconRight && (
        <span className="flex items-center gap-2">{iconRight}</span>
      )}
    </button>
  );
}
