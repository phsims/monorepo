import type { Meta, StoryObj } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ReadMe from './README.md?raw';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: '@shared/atoms/Input',
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'text-input',
    lable: 'input example',
    name: 'input',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/input example/gi)).toBeTruthy();
  },
};
