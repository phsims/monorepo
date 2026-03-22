import type { TextareaHTMLAttributes } from 'react';
import { useId } from 'react';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  textareaClassName?: string;
  id?: string;
  borderless?: boolean;
}

const baseClasses =
  'min-h-[120px] resize-y rounded-md bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

export function Textarea({
  label,
  hint,
  error,
  fullWidth,
  className = '',
  textareaClassName = '',
  id: idProp,
  borderless,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const widthClass = fullWidth ? 'w-full' : '';

  const borderClasses = borderless
    ? ''
    : error
      ? 'border border-danger focus-visible:ring-danger'
      : 'border border-input';

  const textareaClasses = [
    baseClasses,
    borderClasses,
    widthClass,
    textareaClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[widthClass, className].filter(Boolean).join(' ') || undefined}
    >
      {label ? (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        className={textareaClasses}
        aria-invalid={!!error}
        aria-describedby={
          hint ? `${id}-hint` : error ? `${id}-error` : undefined
        }
        {...props}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
