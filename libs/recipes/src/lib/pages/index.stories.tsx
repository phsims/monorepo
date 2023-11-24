import type { Meta, StoryObj } from '@storybook/react';
import { Recipes } from './index';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Recipes> = {
  component: Recipes,
  title: 'Recipes',
};
export default meta;
type Story = StoryObj<typeof Recipes>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Recipes!/gi)).toBeTruthy();
  },
};
