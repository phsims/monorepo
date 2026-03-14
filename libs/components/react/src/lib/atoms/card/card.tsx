import type { HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  elevated: 'bg-background-paper shadow-md border border-border/50',
  outlined: 'bg-transparent border border-input',
  filled: 'bg-neutral border border-neutral',
};

export function Card({
  children,
  variant = 'elevated',
  className = '',
  ...props
}: CardProps) {
  const variantClass = variantClasses[variant];

  const classes = [
    'rounded-lg overflow-hidden transition-colors',
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
  border = false,
}: CardHeaderProps) {
  const classes = [
    'px-4 py-3',
    border ? 'border-b border-border' : 'border-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <div className={classes}>{children}</div>;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  const classes = ['px-4 py-3', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}

export function CardFooter({
  children,
  className = '',
  border = false,
}: CardFooterProps) {
  const classes = [
    'px-4 py-3',
    border ? 'border-t border-border' : 'border-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <div className={classes}>{children}</div>;
}
