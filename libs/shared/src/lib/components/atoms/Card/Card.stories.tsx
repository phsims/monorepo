import type { Meta, StoryObj } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Card } from './Card';
import ReadMe from './README.md?raw';

const meta: Meta<typeof Card> = {
  component: Card,
  title: '@shared/atoms/Card',
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    header: (
      <div>
        <p>this is some header text</p>
      </div>
    ),
    body: <div>body text</div>,
    footer: <div>footer text</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/this is some header text/gi)).toBeTruthy();
    expect(canvas.getByText(/body text/gi)).toBeTruthy();
    expect(canvas.getByText(/footer text/gi)).toBeTruthy();
  },
};
