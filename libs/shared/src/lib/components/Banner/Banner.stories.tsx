import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: 'Banner',
};
export default meta;
type Story = StoryObj<typeof Banner>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Banner!/gi)).toBeTruthy();
  },
};
