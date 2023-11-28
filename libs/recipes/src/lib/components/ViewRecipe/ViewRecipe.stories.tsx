import type { Meta, StoryObj } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ReadMe from './README.md?raw';
import { recipes } from '../../mockData';
import { ViewRecipe } from './ViewRecipe';

const meta: Meta<typeof ViewRecipe> = {
  component: ViewRecipe,
  title: '@Recipes/ViewRecipe',
  parameters: {
    docs: {
      description: {
        component: `<Markdown>${ReadMe}</Markdown>`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ViewRecipe>;

export const Default: Story = {
  args: {
    ...recipes[0],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ViewRecipe!/gi)).toBeTruthy();
  },
};
