import type { ReactNode } from 'react';

type ChipVariant = 'default' | 'primary' | 'secondary' | 'outline';
type ChipSize = 'sm' | 'md';

export interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const variantClasses: Record<ChipVariant, string> = {
  default: 'bg-neutral text-neutral-foreground border border-neutral',
  primary: 'bg-primary text-primary-foreground border border-primary',
  secondary: 'bg-secondary text-secondary-foreground border border-secondary',
  outline: 'bg-transparent text-foreground border border-input',
};

const sizeClasses: Record<ChipSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
};

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  onRemove,
  disabled,
  className = '',
  'aria-label': ariaLabel,
}: ChipProps) {
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  const classes = [
    'inline-flex items-center rounded-full font-medium transition-colors',
    variantClass,
    sizeClass,
    disabled && 'opacity-50 pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role={onRemove ? 'listitem' : undefined}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary"
          aria-label="Remove"
        >
          <span aria-hidden>×</span>
        </button>
      )}
    </span>
  );
}
