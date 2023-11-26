import type { Meta, StoryObj } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { SubmitForm } from './SubmitForm';
import ReadMe from './README.md?raw';

const meta: Meta<typeof SubmitForm> = {
  component: SubmitForm,
  title: '@shared/organisms/SubmitForm',
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
type Story = StoryObj<typeof SubmitForm>;

export const Default: Story = {
  args: {
    inputProps: {
      label: 'Submit Form',
    },
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   expect(canvas.getByText(/Submit Form/gi)).toBeTruthy();
  // },
};
