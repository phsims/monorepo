import type { Meta, StoryObj } from '@storybook/react';
import { LoginDialog } from './LoginDialog';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LoginDialog> = {
  component: LoginDialog,
  title: 'LoginDialog',
};
export default meta;
type Story = StoryObj<typeof LoginDialog>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
};
