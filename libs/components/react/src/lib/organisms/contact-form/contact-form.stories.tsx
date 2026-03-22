import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  ContactForm,
  defaultContactFormFields,
  type ContactFormProps,
} from './contact-form';

/**
 * Contact form with Cloudflare Turnstile and configurable fields. Submissions `POST` JSON
 * `{ [fieldName]: string, turnstileToken }` to `submitUrl`.
 *
 * **Storybook:** use a Turnstile [test site key](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
 * (e.g. `1x0000000000000000000000000000000AA`) with a matching secret on your API, or your production keys.
 * Default `submitUrl` points at `/api/contact` — in Storybook alone that often 404s unless proxied.
 */
const meta: Meta<ContactFormProps> = {
  title: 'React/Organisms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use `fields` for a dynamic layout; export `defaultContactFormFields` for the standard name / email / message set. Optional `heading`, `description`, and `copy` customize strings.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    turnstileSiteKey: {
      description: 'Cloudflare Turnstile site key (public)',
      control: 'text',
    },
    submitUrl: {
      description: 'POST endpoint for the JSON payload',
      control: 'text',
    },
    heading: { control: 'text' },
    description: { control: 'text' },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<ContactFormProps>;

const turnstileTestKey = '1x0000000000000000000000000000000AA';

/** Default name, email, message + Turnstile. */
export const Default: Story = {
  args: {
    turnstileSiteKey: turnstileTestKey,
    submitUrl: '/api/contact',
  },
};

/** Overrides button label, success copy, and generic error / Turnstile strings. */
export const CustomCopy: Story = {
  args: {
    ...Default.args,
    copy: {
      submitLabel: 'Submit feedback',
      submittingLabel: 'Sending feedback…',
      successMessage: 'We received your feedback. Thank you!',
      genericError: 'Could not send — try again or email support.',
      turnstileHint: 'Check the box above to send.',
      turnstileExpired: 'Security check expired — try again.',
    },
  },
};

/** Custom section title and intro. */
export const CustomHeading: Story = {
  args: {
    ...Default.args,
    heading: 'Get in touch',
    description:
      'Questions about CookbookKeeper? Leave your details and we will open a GitHub issue for tracking.',
  },
};

/** No intro line under the heading (`description` empty). */
export const NoDescription: Story = {
  args: {
    ...Default.args,
    heading: 'Quick note',
    description: '',
  },
};

/** Default fields plus optional recipe URL (empty optional fields are omitted from the POST body). */
export const WithOptionalField: Story = {
  args: {
    ...Default.args,
    heading: 'Recipe feedback',
    description: 'Optional link helps us reproduce recipe issues faster.',
    fields: [
      ...defaultContactFormFields,
      {
        name: 'recipeUrl',
        type: 'text',
        label: 'Recipe link (optional)',
        placeholder: 'https://…',
        required: false,
        maxLength: 2000,
      },
    ],
  },
};

/** Smaller field set (e.g. newsletter / quick contact). */
export const ShortFieldSet: Story = {
  args: {
    ...Default.args,
    heading: 'Subscribe',
    description: 'We will only use your email for product updates.',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        autoComplete: 'email',
        maxLength: 320,
        validationMessage: 'Enter a valid email.',
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'What would you like to hear about?',
        rows: 4,
        minLength: 3,
        maxLength: 2000,
        validationMessage: 'Add a short note (at least 3 characters).',
      },
    ],
    copy: {
      submitLabel: 'Subscribe',
      successMessage: 'You are on the list. Thanks!',
    },
  },
};
