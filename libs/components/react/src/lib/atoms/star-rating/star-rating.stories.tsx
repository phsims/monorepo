import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StarRating, type StarRatingProps } from './star-rating';

const meta: Meta<StarRatingProps> = {
  title: 'React/Atoms/StarRating',
  component: StarRating,
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    maxRating: {
      control: { type: 'number', min: 1, max: 10 },
    },
    readOnly: {
      control: 'boolean',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<StarRatingProps>;

export const Default: Story = {
  args: {
    rating: 3.5,
    maxRating: 5,
    readOnly: true,
    size: 'md',
  },
};

export const Empty: Story = {
  args: {
    rating: 0,
    readOnly: true,
  },
};

export const HalfStar: Story = {
  args: {
    rating: 2.5,
    readOnly: true,
  },
};

export const Full: Story = {
  args: {
    rating: 5,
    readOnly: true,
  },
};

export const Small: Story = {
  args: {
    rating: 4,
    size: 'sm',
    readOnly: true,
  },
};

export const Large: Story = {
  args: {
    rating: 4,
    size: 'lg',
    readOnly: true,
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [rating, setRating] = useState(0);

    return (
      <div className="flex flex-col gap-2">
        <StarRating
          rating={rating}
          readOnly={false}
          onRatingChange={setRating}
          aria-label="Your rating"
        />
        <p className="text-sm text-foreground">Current: {rating}</p>
      </div>
    );
  },
};

export const WithCustomAriaLabel: Story = {
  args: {
    rating: 4.5,
    readOnly: true,
    'aria-label': 'Recipe rating',
  },
};
