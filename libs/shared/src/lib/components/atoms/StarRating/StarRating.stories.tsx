import type { Meta } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';

import ReadMe from './README.md?raw';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  component: StarRating,
  title: '@shared/atoms/StarRating',
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

export const Default = {
  args: {
    title: 'chicken pie',
  },
};

export const Rated = {
  args: {
    title: 'chicken pie',
    rating: 3,
  },
};
