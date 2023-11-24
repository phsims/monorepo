import type { Meta, StoryObj } from '@storybook/react';
import { ImportRecipe } from './index';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ImportRecipe> = {
  component: ImportRecipe,
  title: 'ImportRecipe',
};
export default meta;
type Story = StoryObj<typeof ImportRecipe>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImportRecipe!/gi)).toBeTruthy();
  },
};
