import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Nav> = {
  component: Nav,
  title: 'Nav',
};
export default meta;
type Story = StoryObj<typeof Nav>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   expect(canvas.getByText(/Welcome to Nav!/gi)).toBeTruthy();
  // },
};
