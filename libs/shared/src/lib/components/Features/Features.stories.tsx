import type { Meta, StoryObj } from '@storybook/react';
import { Features } from './Features';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Features> = {
  component: Features,
  title: 'Features',
};
export default meta;
type Story = StoryObj<typeof Features>;

export const Primary = {
  args: {
    cardData: [
      {
        imgSrc: '/images/Features/featureOne.svg',
        heading: 'Customized Meal Plans',
        subheading: 'Customize meal plans to fit your diet and goals.',
        link: 'Learn more',
      },
      {
        imgSrc: '/images/Features/featureThree.svg',
        heading: 'Recipe Database',
        subheading: 'Access a variety of recipes for easy meal planning.',
        link: 'Learn more',
      },
      {
        imgSrc: '/images/Features/featureTwo.svg',
        heading: 'Smart Shopping Lists',
        subheading: 'Generate grocery lists from your plans.',
        link: 'Learn more',
      },
      {
        imgSrc: '/images/Features/featureFour.svg',
        heading: 'Nutritional Insights',
        subheading: 'See key nutritional info for healthier eating.',
        link: 'Learn more',
      },
    ],
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Features!/gi)).toBeTruthy();
  },
};
