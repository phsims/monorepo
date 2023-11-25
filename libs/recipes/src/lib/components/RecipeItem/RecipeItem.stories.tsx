import type { Meta } from '@storybook/react';
import { RecipeItem } from './RecipeItem';

const meta: Meta<typeof RecipeItem> = {
  component: RecipeItem,
  title: 'RecipeItem',
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
    name: 'Chicken burger',
    description:
      'You can enjoy these ultimate beef burgers straight away or make and freeze them for sunny days when you want to fire up the barbecue. Want to try something a little different? How about our lamb burgers with feta and harissa; they’re easy to make and ready in just 30 minutes.',
  },
};

export const Complete = {
  args: {
    name: 'Chicken burger',
    description:
      'You can enjoy these ultimate beef burgers straight away or make and freeze them for sunny days when you want to fire up the barbecue. Want to try something a little different? How about our lamb burgers with feta and harissa; they’re easy to make and ready in just 30 minutes.',
    image: '/images/Gallery/foodtwo.jpg',
    rating: 2,
  },
};
