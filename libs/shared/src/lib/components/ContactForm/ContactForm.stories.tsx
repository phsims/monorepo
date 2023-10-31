import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
  title: 'ContactForm',
};
export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ContactForm!/gi)).toBeTruthy();
  },
};
