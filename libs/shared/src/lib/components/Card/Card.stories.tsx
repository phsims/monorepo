import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Card',
  decorators: [
    (Story) => (
      <div className="max-w-md  gap-y-20 gap-x-5 mt-32">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Primary = {
  args: {
    heading: 'Nutritional Insights',
    description: 'See key nutritional info for healthier eating.',
    link: 'Learn more',
  },
};

export const Feature: Story = {
  args: {
    imgSrc: '/images/Features/featureFour.svg',
    heading: 'Nutritional Insights',
    description: 'See key nutritional info for healthier eating.',
    link: 'Learn more',
    imageWrapperClass:
      'flex justify-center absolute  top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] w-full',
  },
};
