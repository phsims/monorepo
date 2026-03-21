import { fireEvent, render, screen } from '@testing-library/react';

import { RecipeCard } from './recipe-card';

describe('RecipeCard', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <RecipeCard title="Classic Margherita Pizza" />,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render title', () => {
    render(<RecipeCard title="Classic Margherita Pizza" />);
    expect(
      screen.getByRole('heading', { name: 'Classic Margherita Pizza' }),
    ).toBeTruthy();
  });

  it('should render image when provided', () => {
    render(<RecipeCard title="Test" image="https://example.com/image.jpg" />);
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect((img as HTMLImageElement).src).toContain('example.com/image.jpg');
  });

  it('should default image alt to title when imageAlt not provided', () => {
    render(
      <RecipeCard
        title="Pasta Carbonara"
        image="https://example.com/pasta.jpg"
      />,
    );
    const img = document.querySelector('img') as HTMLImageElement;
    expect(img.alt).toBe('Pasta Carbonara — recipe');
  });

  it('should use imageAlt prop when provided', () => {
    render(
      <RecipeCard
        title="Pasta"
        image="https://example.com/pasta.jpg"
        imageAlt="Close-up of plated pasta"
      />,
    );
    const img = document.querySelector('img') as HTMLImageElement;
    expect(img.alt).toBe('Close-up of plated pasta');
  });

  it('should render cuisine as chips when provided', () => {
    render(
      <RecipeCard
        title="Pasta"
        image="https://example.com/pasta.jpg"
        cuisines={['Italian', 'Pizza']}
      />,
    );
    expect(screen.getByText('Italian')).toBeTruthy();
    expect(screen.getByText('Pizza')).toBeTruthy();
  });

  it('should render summary when provided', () => {
    render(
      <RecipeCard
        title="Pizza"
        summary="A classic tomato and mozzarella pizza."
      />,
    );
    expect(
      screen.getByText(/A classic tomato and mozzarella pizza/),
    ).toBeTruthy();
  });

  it('should strip HTML tags from summary text', () => {
    render(
      <RecipeCard
        title="Pizza"
        summary="<p>A <strong>classic</strong> tomato pizza.</p>"
      />,
    );

    expect(screen.getByText('A classic tomato pizza.')).toBeTruthy();
  });

  it('should render readyInMinutes and servings', () => {
    render(<RecipeCard title="Soup" readyInMinutes={30} servings={4} />);
    expect(screen.getByText(/30 min/)).toBeTruthy();
    expect(screen.getByText(/4 servings/)).toBeTruthy();
  });

  it('should render prep/cook fallback when readyInMinutes is not provided', () => {
    render(<RecipeCard title="Soup" prepMinutes={10} cookMinutes={20} />);

    expect(screen.getByText('Prep 10 min, Cook 20 min')).toBeTruthy();
  });

  it('should call onFavorite when favorite button is clicked', () => {
    const onFavorite = jest.fn();
    render(
      <RecipeCard
        title="Recipe"
        image="https://example.com/recipe.jpg"
        onFavorite={onFavorite}
      />,
    );
    const favoriteBtn = screen.getByRole('button', {
      name: 'Add to favorites',
    });
    fireEvent.click(favoriteBtn);
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(
      <RecipeCard
        title="Recipe"
        image="https://example.com/recipe.jpg"
        onDelete={onDelete}
      />,
    );
    const deleteBtn = screen.getByRole('button', { name: 'Delete recipe' });
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should show solid heart when isFavorite is true', () => {
    render(
      <RecipeCard
        title="Recipe"
        image="https://example.com/recipe.jpg"
        onFavorite={jest.fn()}
        isFavorite
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Remove from favorites' }),
    ).toBeTruthy();
  });

  it('should render custom actions when provided', () => {
    render(
      <RecipeCard
        title="Recipe"
        image="https://example.com/recipe.jpg"
        actions={<button type="button">Custom action</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Custom action' })).toBeTruthy();
  });

  it('should pass through div attributes', () => {
    render(<RecipeCard title="Recipe" data-testid="recipe-card" id="r1" />);
    const card = screen.getByTestId('recipe-card');
    expect(card.id).toBe('r1');
  });
});
