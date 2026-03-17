import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Button } from '../../atoms/button/button';
import { RoundIconButton } from '../../atoms/round-icon-button/round-icon-button';

export interface SearchBarProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'onSubmit'
  > {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  debounceMs?: number;
  showMagnifier?: boolean;
  leadingIcon?: ReactNode;
  showClearButton?: boolean;
  showSubmitButton?: boolean;
  submitButtonLabel?: string;
  ariaLabel?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  className?: string;
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
  ariaLabel = 'Search',
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
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(value);
    },
    [onSubmit, value],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit?.(value);
      }
    },
    [onSubmit, value],
  );

  const hasValue = value.length > 0;

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={[
        fullWidth ? 'w-full' : '',
        'flex items-center rounded-md border border-input bg-transparent  transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(showMagnifier || leadingIcon) && (
        <span
          className="flex shrink-0 text-muted-foreground [&_svg]:size-5 p-2"
          aria-hidden
        >
          {leadingIcon ?? (
            <MagnifyingGlassIcon className="size-5" aria-hidden />
          )}
        </span>
      )}
      <input
        id={id}
        type="text"
        role="searchbox"
        autoComplete="off"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent   border-none outline-none p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label={ariaLabel || 'Search'}
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
          title={submitButtonLabel}
        />
      )}
    </form>
  );
}
