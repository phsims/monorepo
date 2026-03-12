import { render, screen } from '@testing-library/react';

import { Icon } from './icon';

describe('Icon', () => {
  it('should render children', () => {
    render(<Icon><span data-testid="svg">★</span></Icon>);

    expect(screen.getByTestId('svg')).toBeTruthy();
  });

  it('should apply size classes', () => {
    render(<Icon size="lg"><span>★</span></Icon>);

    const wrapper = screen.getByText('★').parentElement;
    expect(wrapper?.className).toContain('w-6');
    expect(wrapper?.className).toContain('h-6');
  });

  it('should be aria-hidden by default', () => {
    render(<Icon><span>★</span></Icon>);

    const wrapper = screen.getByText('★').parentElement;
    expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should support aria-label for accessibility', () => {
    render(<Icon aria-label="Star"><span>★</span></Icon>);

    expect(screen.getByLabelText('Star')).toBeTruthy();
  });
});
