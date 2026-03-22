'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';

import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Textarea } from '../../atoms/textarea/textarea';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export type ContactFormFieldType = 'text' | 'email' | 'textarea';

export interface ContactFormField {
  /** JSON key sent to the server (e.g. `name`, `email`). */
  name: string;
  type: ContactFormFieldType;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  rows?: number;
  /** @default true */
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  /** Error text when this field fails validation. */
  validationMessage?: string;
}

export const defaultContactFormFields: ContactFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    autoComplete: 'name',
    maxLength: 200,
    validationMessage: 'Please enter your name.',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    autoComplete: 'email',
    maxLength: 320,
    validationMessage: 'Please enter a valid email address.',
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    rows: 6,
    minLength: 10,
    maxLength: 10000,
    validationMessage: 'Please enter a message (at least 10 characters).',
  },
];

export interface ContactFormCopy {
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  genericError?: string;
  turnstileHint?: string;
  turnstileExpired?: string;
}

export interface ContactFormProps {
  /** Cloudflare Turnstile site key (public). */
  turnstileSiteKey: string;
  /** POST endpoint; defaults to `/api/contact`. */
  submitUrl?: string;
  /** Field definitions; defaults to name, email, message. */
  fields?: ContactFormField[];
  /** Section heading (visible). */
  heading?: string;
  /** Intro text under the heading. */
  description?: string;
  className?: string;
  copy?: ContactFormCopy;
}

function sanitizeOneLine(value: string, max: number): string {
  return value
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

const defaultCopy: Required<ContactFormCopy> = {
  submitLabel: 'Send message',
  submittingLabel: 'Sending…',
  successMessage:
    'Thanks — your message was sent. We will get back to you soon.',
  genericError:
    'Something went wrong. Please try again in a moment or email us directly.',
  turnstileHint: 'Complete the verification below to send your message.',
  turnstileExpired: 'Verification expired — please verify again.',
};

function defaultValidationMessage(field: ContactFormField): string {
  if (field.validationMessage) return field.validationMessage;
  if (field.type === 'email') {
    return `Please enter a valid ${field.label.toLowerCase()}.`;
  }
  if (field.minLength != null && field.minLength > 1) {
    return `Please enter at least ${field.minLength} characters for ${field.label.toLowerCase()}.`;
  }
  return `Please enter ${field.label.toLowerCase()}.`;
}

function validateField(field: ContactFormField, raw: string): string | null {
  const required = field.required !== false;
  const value = field.type === 'textarea' ? raw : raw.trim();

  if (required && !value.trim()) {
    return defaultValidationMessage(field);
  }

  if (!required && !value.trim()) {
    return null;
  }

  if (field.type === 'email' && !EMAIL_RE.test(value.trim())) {
    return defaultValidationMessage(field);
  }

  if (field.minLength != null && value.trim().length < field.minLength) {
    return defaultValidationMessage(field);
  }

  if (field.maxLength != null && value.length > field.maxLength) {
    return `${field.label} is too long.`;
  }

  return null;
}

function formatSubmitValue(field: ContactFormField, raw: string): string {
  const max = field.maxLength ?? 10000;
  if (field.type === 'textarea') {
    return raw.trim().slice(0, max);
  }
  return sanitizeOneLine(raw, max);
}

/**
 * Accessible contact form with configurable fields, Cloudflare Turnstile, and
 * submit. Posts JSON `{ [field.name]: string, ..., turnstileToken }` to `submitUrl`.
 */
export function ContactForm({
  turnstileSiteKey,
  submitUrl = '/api/contact',
  fields: fieldsProp,
  heading = 'Contact us',
  description = 'Send a message — we will create a ticket so nothing gets lost.',
  className = '',
  copy: copyProp,
}: ContactFormProps) {
  const fields = fieldsProp ?? defaultContactFormFields;
  const copy = useMemo(() => ({ ...defaultCopy, ...copyProp }), [copyProp]);
  const formId = useId();

  const initialValues = useMemo(
    () =>
      Object.fromEntries(fields.map((f) => [f.name, ''])) as Record<
        string,
        string
      >,
    [fields],
  );

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState('');
  const [clientMounted, setClientMounted] = useState(false);

  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [statusDetail, setStatusDetail] = useState('');
  const [issueUrl, setIssueUrl] = useState<string | null>(null);

  useEffect(() => {
    setClientMounted(true);
  }, []);

  const resetTurnstileState = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileError('');
  }, []);

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {};
    let ok = true;

    if (turnstileToken) {
      setTurnstileError('');
    }

    for (const field of fields) {
      const msg = validateField(field, values[field.name] ?? '');
      if (msg) {
        nextErrors[field.name] = msg;
        ok = false;
      }
    }

    if (!turnstileToken) {
      setTurnstileError(copy.turnstileHint);
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  }, [copy.turnstileHint, fields, turnstileToken, values]);

  const handleSubmit = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatusDetail('');
      setIssueUrl(null);

      if (!validate()) {
        setStatus('idle');
        return;
      }

      const payload: Record<string, string> = {};
      for (const field of fields) {
        const formatted = formatSubmitValue(field, values[field.name] ?? '');
        if (field.required === false && !formatted.trim()) {
          continue;
        }
        payload[field.name] = formatted;
      }

      setStatus('submitting');
      try {
        const res = await fetch(submitUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            turnstileToken,
          }),
        });

        const data = (await res.json()) as {
          error?: string;
          issueUrl?: string;
        };

        if (!res.ok) {
          setStatus('error');
          setStatusDetail(data.error ?? copy.genericError);
          return;
        }

        setStatus('success');
        setIssueUrl(data.issueUrl ?? null);
        setValues(initialValues);
        setErrors({});
        resetTurnstileState();
      } catch {
        setStatus('error');
        setStatusDetail(copy.genericError);
      }
    },
    [
      copy.genericError,
      fields,
      initialValues,
      resetTurnstileState,
      submitUrl,
      turnstileToken,
      validate,
      values,
    ],
  );

  const showForm = status !== 'success';

  const setFieldValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  return (
    <section
      className={['w-full max-w-lg', className].filter(Boolean).join(' ')}
      aria-labelledby={`${formId}-heading`}
    >
      <h2
        id={`${formId}-heading`}
        className="text-xl font-semibold text-foreground"
      >
        {heading}
      </h2>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}

      {status === 'success' ? (
        <div
          className="mt-6 rounded-md border border-border bg-background-paper p-4 text-sm text-foreground shadow-sm"
          role="status"
          aria-live="polite"
        >
          <p>{copy.successMessage}</p>
          {issueUrl ? (
            <p className="mt-2">
              <a
                href={issueUrl}
                className="font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View on GitHub
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      {status === 'error' ? (
        <div
          className="mt-6 rounded-md border border-danger/40 bg-danger/5 p-4 text-sm text-danger"
          role="alert"
          aria-live="assertive"
        >
          {statusDetail || copy.genericError}
        </div>
      ) : null}

      {showForm ? (
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          {fields.map((field) => {
            const id = `${formId}-${field.name}`;
            const common = {
              id,
              name: field.name,
              label: field.label,
              placeholder: field.placeholder,
              fullWidth: true as const,
              required: field.required !== false,
              error: errors[field.name],
              disabled: status === 'submitting',
              value: values[field.name] ?? '',
              onChange: (
                ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setFieldValue(field.name, ev.target.value),
            };

            if (field.type === 'textarea') {
              return (
                <Textarea key={field.name} {...common} rows={field.rows ?? 5} />
              );
            }

            return (
              <Input
                key={field.name}
                {...common}
                type={field.type === 'email' ? 'email' : 'text'}
                autoComplete={field.autoComplete}
              />
            );
          })}

          <div className="flex flex-col gap-2">
            <span className="sr-only" id={`${formId}-turnstile-label`}>
              Anti-spam verification
            </span>
            {clientMounted && turnstileSiteKey ? (
              <div
                className="min-h-[65px]"
                aria-labelledby={`${formId}-turnstile-label`}
              >
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError('');
                  }}
                  onExpire={() => {
                    setTurnstileToken(null);
                    setTurnstileError(copy.turnstileExpired);
                  }}
                  onError={() => {
                    setTurnstileToken(null);
                    setTurnstileError(copy.genericError);
                  }}
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Loading verification…
              </p>
            )}
            {turnstileError ? (
              <p className="text-xs text-danger" role="alert">
                {turnstileError}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            title={
              status === 'submitting' ? copy.submittingLabel : copy.submitLabel
            }
            fullWidth
            disabled={status === 'submitting'}
            loading={status === 'submitting'}
            ariaLabel={
              status === 'submitting' ? copy.submittingLabel : copy.submitLabel
            }
          />
        </form>
      ) : null}
    </section>
  );
}
