import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { RecipeCard, type RecipeCardProps } from './recipe-card';

const meta: Meta<RecipeCardProps> = {
  title: 'React/Molecules/RecipeCard',
  component: RecipeCard,
  decorators: [
    (Story) => (
      <div
        className="w-full max-w-[420px] mx-auto"
        style={{ maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isFavorite: { control: 'boolean' },
    onFavorite: { action: 'favorite' },
    onDelete: { action: 'delete' },
  },
};

export default meta;

type Story = StoryObj<RecipeCardProps>;

const defaultSummary =
  'A classic Margherita pizza with fresh tomatoes, mozzarella, basil, and a thin crust. Simple and delicious.';

export const Default: Story = {
  args: {
    title: 'Classic Margherita Pizza',
    summary: defaultSummary,
    cuisine: ['Italian', 'Pizza'],
    readyInMinutes: 45,
    servings: 2,
    onFavorite: undefined,
    onDelete: undefined,
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    title: 'Classic Margherita Pizza',
    summary: defaultSummary,
    cuisine: ['Italian', 'Pizza'],
    readyInMinutes: 45,
    prepMinutes: 15,
    cookMinutes: 30,
    servings: 2,
  },
};

export const WithActions: Story = {
  args: {
    ...WithImage.args,
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- story placeholder so action buttons render
    onFavorite: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- story placeholder so action buttons render
    onDelete: () => {},
    isFavorite: false,
  },
};

export const Favorited: Story = {
  args: {
    ...WithActions.args,
    isFavorite: true,
  },
};

export const Minimal: Story = {
  args: {
    title: 'Simple Recipe',
  },
};
