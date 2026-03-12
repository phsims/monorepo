import type { ReactNode } from 'react';

type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps {
  children: ReactNode;
  size?: IconSize;
  className?: string;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

const sizeClasses: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function Icon({
  children,
  size = 'md',
  className = '',
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: IconProps) {
  const sizeClass = sizeClasses[size];

  const classes = [
    'inline-flex shrink-0 items-center justify-center text-current',
    sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role={ariaLabel ? 'img' : undefined}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}
