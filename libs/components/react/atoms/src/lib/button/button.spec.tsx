import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeTruthy();
  });

  it('should apply variant classes', () => {
    render(<Button variant="secondary">Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button.className).toContain('bg-gray-100');
  });
});

