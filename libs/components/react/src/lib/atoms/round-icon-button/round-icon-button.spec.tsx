import { render, screen } from '@testing-library/react';

import { RoundIconButton } from './round-icon-button';

describe('RoundIconButton', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <RoundIconButton icon={<span>x</span>} ariaLabel="Action" />,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render with icon and aria-label', () => {
    render(
      <RoundIconButton
        icon={<span data-testid="icon">★</span>}
        ariaLabel="Favorite"
      />,
    );

    expect(screen.getByRole('button', { name: /favorite/i })).toBeTruthy();
    expect(screen.getByTestId('icon').textContent).toBe('★');
  });

  it('should apply variant classes', () => {
    render(
      <RoundIconButton
        icon={<span>x</span>}
        ariaLabel="Close"
        variant="secondary"
      />,
    );

    const button = screen.getByRole('button', { name: /close/i });
    expect(button.className).toContain('bg-secondary');
  });

  it('should apply size classes', () => {
    render(
      <RoundIconButton icon={<span>x</span>} ariaLabel="Action" size="lg" />,
    );

    const button = screen.getByRole('button');
    expect(button.className).toContain('p-2.5');
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <RoundIconButton icon={<span>x</span>} ariaLabel="Action" disabled />,
    );

    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <RoundIconButton
        icon={<span>x</span>}
        ariaLabel="Action"
        onClick={handleClick}
      />,
    );

    screen.getByRole('button', { name: /action/i }).click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should merge custom className', () => {
    render(
      <RoundIconButton
        icon={<span>x</span>}
        ariaLabel="Action"
        className="custom-class"
      />,
    );

    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });
});
