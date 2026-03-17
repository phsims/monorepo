import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { RoundIconButton } from '../../atoms/round-icon-button/round-icon-button';

export interface SearchBarProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'onSubmit'
  > {
  /** Controlled value. Omit to use uncontrolled mode with defaultValue. */
  value?: string;
  /** Initial value in uncontrolled mode. */
  defaultValue?: string;
  /** Called when the input value changes. With debounceMs set, only called after the delay. */
  onChange?: (value: string) => void;
  /** Called when the user submits (Enter key or submit button). */
  onSubmit?: (value: string) => void;
  /** Debounce delay in ms. When set, onChange is called after the user stops typing for this long. */
  debounceMs?: number;
  /** Show a leading magnifier icon. */
  showMagnifier?: boolean;
  /** Custom leading icon (overrides showMagnifier when provided). */
  leadingIcon?: ReactNode;
  /** Show a clear/reset button when the input has value. */
  showClearButton?: boolean;
  /** Show a submit button that triggers onSubmit with the current value. */
  showSubmitButton?: boolean;
  /** Label for the submit button (accessibility and tooltip). */
  submitButtonLabel?: string;
  /** Accessible label for the search input (required when no visible label). */
  'aria-label'?: string;
  /** Visible label for the search input (optional). */
  label?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Full width of the search bar container. */
  fullWidth?: boolean;
  /** Additional class for the root wrapper. */
  className?: string;
  /** Additional class for the input element. */
  inputClassName?: string;
}

export function SearchBar({
  value: valueProp,
  defaultValue = '',
  onChange,
  onSubmit,
  debounceMs,
  showMagnifier = true,
  leadingIcon,
  showClearButton = true,
  showSubmitButton = false,
  submitButtonLabel = 'Search',
  'aria-label': ariaLabel,
  label,
  placeholder = 'Search…',
  fullWidth,
  className = '',
  inputClassName = '',
  id: idProp,
  ...inputProps
}: SearchBarProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(
    isControlled ? (valueProp ?? '') : defaultValue,
  );
  const value = isControlled ? (valueProp ?? '') : internalValue;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isControlled && valueProp !== undefined) {
      setInternalValue(valueProp);
    }
  }, [isControlled, valueProp]);

  const emitChange = useCallback(
    (next: string) => {
      if (isControlled) {
        onChange?.(next);
        return;
      }
      if (debounceMs != null && debounceMs > 0) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          debounceRef.current = null;
          onChange?.(next);
        }, debounceMs);
      } else {
        onChange?.(next);
      }
    },
    [isControlled, debounceMs, onChange],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (!isControlled) setInternalValue(next);
      emitChange(next);
    },
    [isControlled, emitChange],
  );

  const handleClear = useCallback(() => {
    setInternalValue('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    onChange?.('');
  }, [onChange]);

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      onSubmit?.(value);
    },
    [onSubmit, value],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const effectiveAriaLabel = ariaLabel ?? (label ? undefined : 'Search');
  const hasValue = value.length > 0;

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={[
        fullWidth ? 'w-full' : '',
        'flex items-center gap-2 rounded-md border border-input bg-transparent px-2 py-1.5 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(showMagnifier || leadingIcon) && (
        <span
          className="flex shrink-0 text-muted-foreground [&_svg]:size-5"
          aria-hidden
        >
          {leadingIcon ?? (
            <MagnifyingGlassIcon className="size-5" aria-hidden />
          )}
        </span>
      )}
      <Input
        id={id}
        type="search"
        role="searchbox"
        autoComplete="off"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        label={label}
        placeholder={placeholder}
        fullWidth
        className="min-w-0 flex-1 border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        inputClassName={[
          'border-0 focus-visible:ring-0 focus-visible:ring-offset-0',
          inputClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={effectiveAriaLabel}
        {...inputProps}
      />
      {showClearButton && hasValue && (
        <RoundIconButton
          type="button"
          icon={<XMarkIcon className="size-5" />}
          variant="ghost"
          size="sm"
          ariaLabel="Clear search"
          onClick={handleClear}
          className="shrink-0"
        />
      )}
      {showSubmitButton && (
        <Button
          type="submit"
          variant="primary"
          ariaLabel={submitButtonLabel}
          className="shrink-0"
        >
          {submitButtonLabel}
        </Button>
      )}
    </form>
  );
}
