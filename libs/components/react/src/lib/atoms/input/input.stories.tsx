import type { Meta, StoryObj } from '@storybook/react';

import { Input, type InputProps } from './input';

const meta: Meta<InputProps> = {
  title: 'React/Atoms/Input',
  component: Input,
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    hint: 'Letters, numbers, and underscores only.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters.',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full width input',
    placeholder: 'Stretches to container',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};
