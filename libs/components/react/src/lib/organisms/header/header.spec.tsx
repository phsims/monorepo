import { render, screen } from '@testing-library/react';

import { Header, type HeaderLink } from './header';

describe('Header', () => {
  const brand = <span>Cookbook</span>;
  const navLinks: HeaderLink[] = [
    { label: 'Recipes', href: '/recipes' },
    { label: 'Collections', href: '/collections' },
  ];

  it('should match snapshot', () => {
    const { container } = render(<Header brand={brand} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the brand content', () => {
    render(<Header brand={brand} />);

    expect(screen.getByText('Cookbook')).toBeTruthy();
  });

  it('renders navigation links when provided', () => {
    render(<Header brand={brand} navLinks={navLinks} />);

    expect(screen.getByText('Recipes')).toBeTruthy();
    expect(screen.getByText('Collections')).toBeTruthy();
  });

  it('renders right-aligned actions when provided', () => {
    render(
      <Header brand={brand} actions={<button type="button">Sign in</button>} />,
    );

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeTruthy();
  });

  it('applies sticky classes when sticky is true', () => {
    const { container } = render(<Header brand={brand} sticky />);

    expect(container.firstChild).toBeTruthy();
    expect((container.firstChild as HTMLElement).className).toContain('sticky');
    expect((container.firstChild as HTMLElement).className).toContain('top-0');
    expect((container.firstChild as HTMLElement).className).toContain('z-40');
  });
});
