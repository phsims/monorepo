import type { Meta, StoryObj } from '@storybook/react';

import { RecipeCard } from './recipe-card';

const meta: Meta<typeof RecipeCard> = {
  title: 'React/Molecules/RecipeCard',
  component: RecipeCard,
  args: {
    title: 'Classic Margherita Pizza',
    cuisine: 'Italian',
    summary:
      'A simple, classic pizza with fresh basil, mozzarella, and a crisp thin crust.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    imageUrl:
      'https://images.pexels.com/photos/15968843/pexels-photo-15968843.jpeg',
    isFavorite: false,
  },
};

export default meta;

type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {};

export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
};

export const NoImage: Story = {
  args: {
    imageUrl: undefined,
  },
};
