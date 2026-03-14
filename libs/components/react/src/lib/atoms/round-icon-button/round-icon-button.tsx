import type { ButtonHTMLAttributes, ReactNode } from 'react';

type RoundIconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white';
type RoundIconButtonSize = 'sm' | 'md' | 'lg';

export interface RoundIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display (e.g. Heroicons component) */
  icon: ReactNode;
  variant?: RoundIconButtonVariant;
  size?: RoundIconButtonSize;
  /** Required for accessibility when button has no visible text */
  ariaLabel: string;
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses: Record<RoundIconButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary border border-border',
  ghost:
    'bg-transparent text-foreground hover:bg-primary/10 focus-visible:ring-primary',
  white: 'bg-white text-foreground hover:bg-white/90 focus-visible:ring-white',
};

const sizeClasses: Record<RoundIconButtonSize, string> = {
  sm: 'p-1.5 [&_svg]:h-4 [&_svg]:w-4',
  md: 'p-2 [&_svg]:h-5 [&_svg]:w-5',
  lg: 'p-2.5 [&_svg]:h-6 [&_svg]:w-6',
};

export function RoundIconButton({
  icon,
  variant = 'primary',
  size = 'md',
  ariaLabel,
  className = '',
  ...props
}: RoundIconButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} aria-label={ariaLabel} {...props}>
      {icon}
    </button>
  );
}
