import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof StarRating> = {
  component: StarRating,
  title: 'StarRating',
};
export default meta;
type Story = StoryObj<typeof StarRating>;

export const Primary = {
  args: {
    initialRating: 3,
    title: 'chicken pie',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StarRating!/gi)).toBeTruthy();
  },
};
