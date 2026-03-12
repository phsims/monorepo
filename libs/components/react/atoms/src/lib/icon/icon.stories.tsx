import type { Meta, StoryObj } from '@storybook/react';

import { Icon, type IconProps } from './icon';

const meta: Meta<IconProps> = {
  title: 'React/Atoms/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<IconProps>;

const SampleSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Default: Story = {
  args: {
    children: <SampleSvg />,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: <SampleSvg />,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: <SampleSvg />,
    size: 'lg',
  },
};

export const WithAriaLabel: Story = {
  args: {
    children: <SampleSvg />,
    size: 'md',
    'aria-label': 'Star',
  },
};

export const UnicodeSymbol: Story = {
  args: {
    children: '★',
    size: 'lg',
  },
};
