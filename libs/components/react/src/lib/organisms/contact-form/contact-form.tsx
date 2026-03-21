'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
} from 'react';

import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Textarea } from '../../atoms/textarea/textarea';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormCopy {
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  genericError?: string;
  validationName?: string;
  validationEmail?: string;
  validationMessage?: string;
  turnstileHint?: string;
  turnstileExpired?: string;
}

export interface ContactFormProps {
  /** Cloudflare Turnstile site key (public). */
  turnstileSiteKey: string;
  /** POST endpoint; defaults to `/api/contact`. */
  submitUrl?: string;
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
  nameLabel: 'Name',
  emailLabel: 'Email',
  messageLabel: 'Message',
  submitLabel: 'Send message',
  submittingLabel: 'Sending…',
  successMessage:
    'Thanks — your message was sent. We will get back to you soon.',
  genericError:
    'Something went wrong. Please try again in a moment or email us directly.',
  validationName: 'Please enter your name.',
  validationEmail: 'Please enter a valid email address.',
  validationMessage: 'Please enter a message (at least 10 characters).',
  turnstileHint: 'Complete the verification below to send your message.',
  turnstileExpired: 'Verification expired — please verify again.',
};

/**
 * Accessible contact form with name, email, message, Cloudflare Turnstile, and
 * submit. Posts JSON `{ name, email, message, turnstileToken }` to `submitUrl`.
 */
export function ContactForm({
  turnstileSiteKey,
  submitUrl = '/api/contact',
  className = '',
  copy: copyProp,
}: ContactFormProps) {
  const copy = useMemo(() => ({ ...defaultCopy, ...copyProp }), [copyProp]);
  const formId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

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
    let ok = true;
    setNameError('');
    setEmailError('');
    setMessageError('');

    if (!name.trim()) {
      setNameError(copy.validationName);
      ok = false;
    }
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setEmailError(copy.validationEmail);
      ok = false;
    }
    if (message.trim().length < 10) {
      setMessageError(copy.validationMessage);
      ok = false;
    }
    if (!turnstileToken) {
      setTurnstileError(copy.turnstileHint);
      ok = false;
    }
    return ok;
  }, [copy, email, message, name, turnstileToken]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatusDetail('');
      setIssueUrl(null);

      if (!validate()) {
        setStatus('idle');
        return;
      }

      setStatus('submitting');
      try {
        const res = await fetch(submitUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: sanitizeOneLine(name, 200),
            email: sanitizeOneLine(email, 320),
            message: message.trim().slice(0, 10000),
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
        setName('');
        setEmail('');
        setMessage('');
        resetTurnstileState();
      } catch {
        setStatus('error');
        setStatusDetail(copy.genericError);
      }
    },
    [
      copy.genericError,
      email,
      message,
      name,
      resetTurnstileState,
      submitUrl,
      turnstileToken,
      validate,
    ],
  );

  const showForm = status !== 'success';

  return (
    <section
      className={['w-full max-w-lg', className].filter(Boolean).join(' ')}
      aria-labelledby={`${formId}-heading`}
    >
      <h2
        id={`${formId}-heading`}
        className="text-xl font-semibold text-foreground"
      >
        Contact us
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Send a message — we will create a ticket so nothing gets lost.
      </p>

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
          <Input
            id={`${formId}-name`}
            name="name"
            type="text"
            label={copy.nameLabel}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            autoComplete="name"
            fullWidth
            required
            error={nameError}
            disabled={status === 'submitting'}
          />
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            label={copy.emailLabel}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            autoComplete="email"
            fullWidth
            required
            error={emailError}
            disabled={status === 'submitting'}
          />
          <Textarea
            id={`${formId}-message`}
            name="message"
            label={copy.messageLabel}
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            rows={6}
            fullWidth
            required
            error={messageError}
            disabled={status === 'submitting'}
          />

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
