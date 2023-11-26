import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  title: 'LoginForm',
};
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
};
