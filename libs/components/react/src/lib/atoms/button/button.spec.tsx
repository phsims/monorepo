import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('should render with title', () => {
    render(<Button title="Click me" />);

    expect(screen.getByRole('button', { name: /click me/i })).toBeTruthy();
  });

  it('should apply variant classes', () => {
    render(<Button variant="secondary" title="Click me" />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button.className).toContain('bg-secondary');
  });

  it('should show loading state', () => {
    render(<Button title="Submit" loading />);

    expect(screen.getByRole('button').textContent).toContain('Loading...');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button title="Click me" disabled />);

    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button title="Click me" onClick={handleClick} />);

    screen.getByRole('button', { name: /click me/i }).click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply fullWidth class when fullWidth is true', () => {
    render(<Button title="Click me" fullWidth />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('w-full');
  });

  it('should support aria attributes', () => {
    render(
      <Button
        title="Submit"
        ariaLabel="Submit form"
        ariaDescribedby="hint-id"
      />
    );

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Submit form');
    expect(button.getAttribute('aria-describedby')).toBe('hint-id');
  });

  it('should render iconLeft and iconRight', () => {
    render(
      <Button title="Actions" iconLeft={<span>L</span>} iconRight={<span>R</span>} />
    );

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('L');
    expect(button.textContent).toContain('R');
    expect(button.textContent).toContain('Actions');
  });
});

