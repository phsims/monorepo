import { render, screen } from '@testing-library/react';

import { Chip } from './chip';

describe('Chip', () => {
  it('should render children', () => {
    render(<Chip>Tag</Chip>);

    expect(screen.getByText('Tag')).toBeTruthy();
  });

  it('should apply variant classes', () => {
    render(<Chip variant="primary">Primary</Chip>);

    const chip = screen.getByText('Primary').parentElement;
    expect(chip?.className).toContain('bg-primary');
  });

  it('should apply size classes', () => {
    render(<Chip size="sm">Small</Chip>);

    const chip = screen.getByText('Small').parentElement;
    expect(chip?.className).toContain('text-xs');
  });

  it('should render remove button when onRemove is provided', () => {
    const onRemove = jest.fn();
    render(<Chip onRemove={onRemove}>Removable</Chip>);

    const removeBtn = screen.getByRole('button', { name: /remove/i });
    removeBtn.click();
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('should not render remove button when onRemove is not provided', () => {
    render(<Chip>Static</Chip>);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should support aria-label', () => {
    render(<Chip aria-label="Category: React">React</Chip>);

    expect(screen.getByLabelText('Category: React')).toBeTruthy();
  });
});
