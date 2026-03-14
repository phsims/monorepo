import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  id?: string;
}

const baseClasses =
  'rounded-md border bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

export function Input({
  label,
  hint,
  error,
  fullWidth,
  className = '',
  inputClassName = '',
  id: idProp,
  ...props
}: InputProps) {
  const id = idProp ?? `input-${Math.random().toString(36).slice(2, 9)}`;
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClasses = error ? 'border-danger focus-visible:ring-danger' : 'border-input';

  const inputClasses = [baseClasses, errorClasses, widthClass, inputClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[widthClass, className].filter(Boolean).join(' ') || undefined}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input id={id} className={inputClasses} aria-invalid={!!error} aria-describedby={hint ? `${id}-hint` : error ? `${id}-error` : undefined} {...props} />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
