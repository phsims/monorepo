import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary = {
  args: {
    id: 'text-input',
    lable: 'input example',
    name: 'input',
    placeholder: 'text input example',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Input!/gi)).toBeTruthy();
  },
};
