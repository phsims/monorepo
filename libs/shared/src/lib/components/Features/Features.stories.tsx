import type { Meta } from '@storybook/react';
import { Features } from './Features';

const meta: Meta<typeof Features> = {
  component: Features,
  title: 'Features',
};
export default meta;

export const Default = {
  args: {
    cardData: [
      {
        image: '/images/Features/featureOne.svg',
        heading: 'Customized Meal Plans',
        subheading: 'Customize meal plans to fit your diet and goals.',
        link: 'Learn more',
      },
      {
        image: '/images/Features/featureThree.svg',
        heading: 'Recipe Database',
        subheading: 'Access a variety of recipes for easy meal planning.',
        link: 'Learn more',
      },
      {
        image: '/images/Features/featureTwo.svg',
        heading: 'Smart Shopping Lists',
        subheading: 'Generate grocery lists from your plans.',
        link: 'Learn more',
      },
      {
        image: '/images/Features/featureFour.svg',
        heading: 'Nutritional Insights',
        subheading: 'See key nutritional info for healthier eating.',
        link: 'Learn more',
      },
    ],
  },
};
