import type { Meta } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Card',
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default = {
  args: {
    header: (
      <div>
        <p>this is some header text</p>
      </div>
    ),
    body: <div>body</div>,
    footer: <div>footer</div>,
  },
};
