import type { Meta, StoryObj } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Button } from './Button';
import ReadMe from './README.md?raw';

const meta: Meta<typeof Button> = {
  component: Button,
  title: '@shared/atoms/Button',
  tags: ['autodocs'],
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { text: 'button text' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/button text/gi)).toBeTruthy();
  },
};

export const Disabled: Story = {
  args: {
    text: 'button text',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/button text/gi)).toBeDisabled();
  },
};
