import type { Meta, StoryObj } from '@storybook/react';

import { Chip, type ChipProps } from './chip';

const meta: Meta<ChipProps> = {
  title: 'React/Atoms/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'primary', 'secondary', 'outline'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<ChipProps>;

export const Default: Story = {
  args: {
    children: 'Chip',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable chip',
    onRemove: () => {},
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
