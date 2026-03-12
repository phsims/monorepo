import type { Meta, StoryObj } from '@storybook/react';

import { Button, type ButtonProps } from './button';

const meta: Meta<ButtonProps> = {
  title: 'React/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit', 'reset'],
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    title: 'Ghost Button',
    variant: 'ghost',
  },
};

export const FullWidth: Story = {
  args: {
    title: 'Full Width Button',
    variant: 'primary',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Submit',
    variant: 'primary',
    loading: true,
  },
};

export const WithIcons: Story = {
  args: {
    title: 'With Icons',
    variant: 'primary',
    iconLeft: '←',
    iconRight: '→',
  },
};

export const Accessible: Story = {
  args: {
    title: 'Accessible Button',
    variant: 'primary',
    ariaLabel: 'Submit form',
    ariaDescribedby: 'submit-hint',
  },
};
