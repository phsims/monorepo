import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { RecipeCard } from './recipe-card';

describe('RecipeCard', () => {
  const baseProps = {
    title: 'Classic Margherita Pizza',
    cuisine: 'Italian',
    summary: 'A simple, classic pizza with fresh basil and mozzarella.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    imageUrl: 'https://example.com/pizza.jpg',
  };

  it('renders the title and cuisine', () => {
    render(<RecipeCard {...baseProps} />);

    expect(
      screen.getByRole('heading', { name: baseProps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseProps.cuisine)).toBeInTheDocument();
  });

  it('renders timing and servings information', () => {
    render(<RecipeCard {...baseProps} />);

    expect(screen.getByText('Prep')).toBeInTheDocument();
    expect(screen.getByText('Cook')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Servings')).toBeInTheDocument();
  });

  it('calls favorite and delete handlers when buttons are clicked', () => {
    const onFavoriteClick = jest.fn();
    const onDeleteClick = jest.fn();

    render(
      <RecipeCard
        {...baseProps}
        onFavoriteClick={onFavoriteClick}
        onDeleteClick={onDeleteClick}
      />,
    );

    const favoriteButton = screen.getByRole('button', {
      name: /favorite recipe/i,
    });
    const deleteButton = screen.getByRole('button', { name: /delete recipe/i });

    fireEvent.click(favoriteButton);
    fireEvent.click(deleteButton);

    expect(onFavoriteClick).toHaveBeenCalledTimes(1);
    expect(onDeleteClick).toHaveBeenCalledTimes(1);
  });
});
