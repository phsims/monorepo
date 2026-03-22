import type { Meta, StoryObj } from '@storybook/react';

import { Textarea, type TextareaProps } from './textarea';

const meta: Meta<TextareaProps> = {
  title: 'React/Atoms/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type here…',
    rows: 4,
    fullWidth: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Feedback',
    error: 'Please enter at least 10 characters.',
    fullWidth: true,
  },
};
