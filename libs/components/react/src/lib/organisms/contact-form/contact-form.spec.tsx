/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { ContactForm, defaultContactFormFields } from './contact-form';

jest.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => {
    React.useEffect(() => {
      onSuccess('test-turnstile-token');
    }, [onSuccess]);
    return <div data-testid="turnstile-mock" />;
  },
}));

const STABLE_FIELDS_WITH_OPTIONAL = [
  ...defaultContactFormFields,
  {
    name: 'company',
    type: 'text' as const,
    label: 'Company',
    required: false,
    maxLength: 120,
  },
];

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render default heading and description', async () => {
    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/x" />);

    expect(screen.getByRole('heading', { name: /contact us/i })).toBeTruthy();
    expect(screen.getByText(/we will create a ticket/i)).toBeTruthy();
    await screen.findByTestId('turnstile-mock');
  });

  it('should render custom heading and description', async () => {
    render(
      <ContactForm
        turnstileSiteKey="key"
        submitUrl="/api/x"
        heading="Support desk"
        description="We reply within two business days."
      />,
    );

    expect(screen.getByRole('heading', { name: /support desk/i })).toBeTruthy();
    expect(screen.getByText(/we reply within two business days/i)).toBeTruthy();
    await screen.findByTestId('turnstile-mock');
  });

  it('should not render description when empty string', async () => {
    render(
      <ContactForm
        turnstileSiteKey="key"
        submitUrl="/api/x"
        heading="Note"
        description=""
      />,
    );

    expect(screen.queryByText(/we will create a ticket/i)).toBeNull();
    await screen.findByTestId('turnstile-mock');
  });

  it('should submit all default fields and show success with issue link', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        issueUrl: 'https://github.com/o/r/issues/1',
      }),
    });

    render(
      <ContactForm turnstileSiteKey="test-site-key" submitUrl="/api/contact" />,
    );

    await screen.findByTestId('turnstile-mock');

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
    expect(body.message).toBe('This is a long enough message for validation.');
    expect(body.turnstileToken).toBe('test-turnstile-token');

    expect(await screen.findByText(/Thanks/)).toBeTruthy();
    const issueLink = screen.getByRole('link', { name: /view on github/i });
    expect(issueLink.getAttribute('href')).toBe(
      'https://github.com/o/r/issues/1',
    );
  });

  it('should show validation when name is empty', async () => {
    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/x" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should show validation for invalid email', async () => {
    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/x" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'not-an-email' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Enough chars for message validation here.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should show validation when message is too short', async () => {
    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/x" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 't@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'short' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/at least 10 characters/i)).toBeTruthy();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should clear field error after user edits the field', async () => {
    render(<ContactForm turnstileSiteKey="key" submitUrl="/api/x" />);

    await screen.findByTestId('turnstile-mock');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Pat' },
    });

    expect(screen.queryByText(/please enter your name/i)).toBeNull();
  });

  it('should use custom submit label from copy', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(
      <ContactForm
        turnstileSiteKey="key"
        submitUrl="/api/c"
        copy={{ submitLabel: 'Ship it' }}
      />,
    );

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'A' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'a@b.co' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: '1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ship it/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('should show error when API returns non-OK', async () => {
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

  it('should show generic error when fetch throws', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('network'));

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
    expect(alert.textContent).toMatch(/something went wrong/i);
  });

  it('should submit custom fields when fields prop is set', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ issueUrl: 'https://github.com/o/r/issues/2' }),
    });

    render(
      <ContactForm
        turnstileSiteKey="key"
        submitUrl="/api/contact"
        heading="Support"
        fields={[
          {
            name: 'topic',
            type: 'text',
            label: 'Topic',
            maxLength: 100,
            validationMessage: 'Topic required.',
          },
          {
            name: 'details',
            type: 'textarea',
            label: 'Details',
            rows: 4,
            minLength: 5,
            validationMessage: 'Add more detail.',
          },
        ]}
      />,
    );

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Topic'), {
      target: { value: 'Bug report' },
    });
    fireEvent.change(screen.getByLabelText('Details'), {
      target: { value: 'Steps to reproduce here.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.topic).toBe('Bug report');
    expect(body.details).toBe('Steps to reproduce here.');
    expect(body.turnstileToken).toBe('test-turnstile-token');
  });

  it('should omit optional field from payload when left empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(
      <ContactForm
        turnstileSiteKey="key"
        submitUrl="/api/contact"
        fields={STABLE_FIELDS_WITH_OPTIONAL}
      />,
    );

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Sam' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'sam@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: '1234567890 message body' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body).not.toHaveProperty('company');
    expect(body.name).toBe('Sam');
  });

  it('should include optional field when filled', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(
      <ContactForm
        turnstileSiteKey="key"
        submitUrl="/api/contact"
        fields={STABLE_FIELDS_WITH_OPTIONAL}
      />,
    );

    await screen.findByTestId('turnstile-mock');

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Sam' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'sam@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: '1234567890 message body' },
    });
    fireEvent.change(screen.getByLabelText('Company'), {
      target: { value: 'Acme Inc' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.company).toBe('Acme Inc');
  });
});
