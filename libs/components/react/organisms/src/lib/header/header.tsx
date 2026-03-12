import type { HTMLAttributes, ReactNode } from 'react';

export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Brand content shown on the left (text logo or ReactNode).
   * Usually a link back to the app home.
   */
  brand: ReactNode;
  /**
   * Primary navigation links rendered in the center/left.
   */
  navLinks?: HeaderLink[];
  /**
   * Optional right‑aligned actions (buttons, avatar, theme toggle, etc.).
   */
  actions?: ReactNode;
  /**
   * When true, makes the header sticky at the top with a subtle shadow.
   */
  sticky?: boolean;
}

/**
 * Reusable application header for the design system.
 * Provides a semantic `<header>` wrapper with navigation and actions.
 */
export function Header({
  brand,
  navLinks,
  actions,
  sticky = false,
  className,
  ...rest
}: HeaderProps) {
  const baseClasses =
    'w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-900';
  const stickyClasses = sticky ? 'sticky top-0 z-40 shadow-sm' : '';

  return (
    <header
      className={[baseClasses, stickyClasses, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">{brand}</div>

        {navLinks && navLinks.length > 0 ? (
          <nav
            aria-label="Primary"
            className="hidden md:block md:flex-1 md:px-6"
          >
            <ul className="flex items-center justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="flex items-center gap-3">{actions}</div>
      </div>
    </header>
  );
}
