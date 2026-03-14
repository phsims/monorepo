import { render, screen } from '@testing-library/react';

import { Card, CardHeader, CardContent, CardFooter } from './card';

describe('Card', () => {
  it('should render children', () => {
    render(
      <Card>
        <CardContent>Body</CardContent>
      </Card>,
    );

    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('should apply variant classes', () => {
    render(
      <Card variant="outlined" data-testid="card">
        <CardContent>Content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId('card');
    expect(card.className).toContain('border');
  });

  it('should render header, content, and footer', () => {
    render(
      <Card>
        <CardHeader>Title</CardHeader>
        <CardContent>Body text</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Body text')).toBeTruthy();
    expect(screen.getByText('Footer')).toBeTruthy();
  });

  it('should pass through div attributes', () => {
    render(
      <Card data-testid="my-card" id="card-1">
        <CardContent>Content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId('my-card');
    expect(card.id).toBe('card-1');
  });
});
