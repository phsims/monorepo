import { render, screen } from '@testing-library/react';

import { HeroBanner } from './hero-banner';

describe('HeroBanner', () => {
  const leftContent = <div>Left content</div>;
  const rightContent = <div>Right content</div>;

  it('renders left and right content', () => {
    render(
      <HeroBanner leftContent={leftContent} rightContent={rightContent} />,
    );

    expect(screen.getByText('Left content')).toBeTruthy();
    expect(screen.getByText('Right content')).toBeTruthy();
  });

  it('renders with aria-label for accessibility', () => {
    render(
      <HeroBanner leftContent={leftContent} rightContent={rightContent} />,
    );

    const section = screen.getByRole('region', { name: 'Banner' });
    expect(section).toBeTruthy();
  });

  it('applies contained layout classes when layout is contained', () => {
    const { container } = render(
      <HeroBanner
        leftContent={leftContent}
        rightContent={rightContent}
        layout="contained"
      />,
    );

    const wrapper = container.querySelector('.max-w-7xl');
    expect(wrapper).toBeTruthy();
    expect(wrapper?.className).toContain('px-4');
  });

  it('applies background class when provided', () => {
    const { container } = render(
      <HeroBanner
        leftContent={leftContent}
        rightContent={rightContent}
        background="bg-primary"
      />,
    );

    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-primary');
  });

  it('applies split ratio grid classes for 30-70', () => {
    const { container } = render(
      <HeroBanner
        leftContent={leftContent}
        rightContent={rightContent}
        split="30-70"
      />,
    );

    const wrapper = container.querySelector('.grid');
    expect(wrapper?.className).toContain('grid-cols-[3fr_7fr]');
  });
});
