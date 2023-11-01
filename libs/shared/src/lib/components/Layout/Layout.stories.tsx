import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'Layout',
};
export default meta;
type Story = StoryObj<typeof Layout>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Layout!/gi)).toBeTruthy();
  },
};
