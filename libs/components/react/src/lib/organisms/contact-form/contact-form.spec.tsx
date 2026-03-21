/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { ContactForm } from './contact-form';

jest.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => {
    React.useEffect(() => {
      onSuccess('test-turnstile-token');
    }, [onSuccess]);
    return <div data-testid="turnstile-mock" />;
  },
}));

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render fields and submit', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ issueUrl: 'https://github.com/o/r/issues/1' }),
    });

    render(
      <ContactForm turnstileSiteKey="test-site-key" submitUrl="/api/contact" />,
    );

    expect(await screen.findByTestId('turnstile-mock')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'This is a long enough message for validation.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.name).toBe('Ada Lovelace');
    expect(body.email).toBe('ada@example.com');
    expect(body.turnstileToken).toBe('test-turnstile-token');

    expect(await screen.findByText(/Thanks/)).toBeTruthy();
  });

  it('should show validation errors when empty', async () => {
    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/x" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should show error when API fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server busy' }),
    });

    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/contact" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 't@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello there this is ten plus chars' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Server busy');
  });
});
