import type { Meta, StoryObj } from '@storybook/react';
import { AllRecipes } from './index';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AllRecipes> = {
  component: AllRecipes,
  title: 'AllRecipes',
};
export default meta;
type Story = StoryObj<typeof AllRecipes>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AllRecipes!/gi)).toBeTruthy();
  },
};
