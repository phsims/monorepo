import type { Meta, StoryObj } from '@storybook/react';

import { ContactForm, type ContactFormProps } from './contact-form';

/**
 * Use Cloudflare Turnstile **test** site key in local Storybook, or your own keys.
 * Submissions call `submitUrl` — point to a mock server or leave default (will 404).
 */
const meta: Meta<ContactFormProps> = {
  title: 'React/Organisms/ContactForm',
  component: ContactForm,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<ContactFormProps>;

/** Cloudflare docs: visible test key that always passes (use with matching secret in API). */
export const Default: Story = {
  args: {
    turnstileSiteKey: '1x0000000000000000000000000000000AA',
    submitUrl: '/api/contact',
  },
};

export const CustomCopy: Story = {
  args: {
    ...Default.args,
    copy: {
      submitLabel: 'Submit feedback',
      successMessage: 'We received your feedback. Thank you!',
    },
  },
};
