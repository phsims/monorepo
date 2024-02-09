import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';
0
import ReadMe from './README.md?raw';
import { recipes } from '../../mockData';
import { EditRecipe } from './EditRecipe';

const meta: Meta<typeof EditRecipe> = {
  component: EditRecipe,
  title: '@Recipes/EditRecipe',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<Markdown>${ReadMe}</Markdown>`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EditRecipe>;


export const Default: Story = {
  args: {
    ...recipes[0]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EditRecipe!/gi)).toBeTruthy();
  },
};
