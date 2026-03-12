import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardHeader, CardContent, CardFooter, type CardProps } from './card';

const meta: Meta<CardProps> = {
  title: 'React/Atoms/Card',
  component: Card,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['elevated', 'outlined', 'filled'],
    },
  },
};

export default meta;

type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardContent>Card content goes here.</CardContent>
      </>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>Card title</CardHeader>
        <CardContent>
          This is the main content area. You can put any content inside.
        </CardContent>
        <CardFooter>Footer actions or metadata</CardFooter>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>Outlined card</CardHeader>
        <CardContent>Uses border only, no shadow.</CardContent>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <CardHeader>Filled card</CardHeader>
        <CardContent>Uses neutral background.</CardContent>
      </>
    ),
  },
};
