import type { Meta, StoryObj } from '@storybook/react';
import { RecipeItem } from './RecipeItem';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RecipeItem> = {
  component: RecipeItem,
  title: 'RecipeItem',
};
export default meta;
type Story = StoryObj<typeof RecipeItem>;

export const Primary = {
  args: {
    name: 'Chicken burger',
    description: 'this is a tasty burger',
    rating: 2,
    image: 'images/Cook/burger.png',
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RecipeItem!/gi)).toBeTruthy();
  },
};
