/**
 * Default shared Tailwind semantic theme extension for this monorepo.
 *
 * This file defines Tailwind-style semantic tokens (primary, secondary, accent,
 * success, warning, danger, neutral) whose values come from CSS variables
 * set by the active theme (for example the Cookbook theme in Storybook).
 *
 * Usage in an app Tailwind config (e.g. apps/CookbookKeeper/tailwind.config.js):
 *
 *   const { defaultTailwindExtend } = require('../themes/tailwind-themes/default');
 *
 *   module.exports = {
 *     // ...content config...
 *     theme: {
 *       extend: {
 *         ...defaultTailwindExtend,
 *         // app-specific extensions here
 *       },
 *     },
 *     plugins: [],
 *   };
 */

/** @type {{ colors: Record<string, any>, spacing: Record<string, string>, borderRadius: Record<string, string>, borderWidth: Record<string, string> }} */
const defaultTailwindExtend = {
  colors: {
    primary: {
      DEFAULT: 'var(--theme-primary-main)',
      foreground:
        'var(--theme-primary-foreground, var(--theme-background-paper))',
      light: 'var(--theme-primary-light, var(--theme-primary-main))',
      dark: 'var(--theme-primary-dark, var(--theme-primary-main))',
    },
    secondary: {
      DEFAULT: 'var(--theme-secondary-main)',
      foreground:
        'var(--theme-secondary-foreground, var(--theme-background-paper))',
      light: 'var(--theme-secondary-light, var(--theme-secondary-main))',
      dark: 'var(--theme-secondary-dark, var(--theme-secondary-main))',
    },
    accent: {
      DEFAULT: 'var(--theme-primary-light)',
      foreground:
        'var(--theme-primary-light-foreground, var(--theme-background-paper))',
    },
    success: {
      DEFAULT: 'var(--theme-success-main, #16a34a)',
      foreground:
        'var(--theme-success-foreground, var(--theme-background-paper))',
    },
    warning: {
      DEFAULT: 'var(--theme-warning-main, #eab308)',
      foreground: 'var(--theme-warning-foreground, #000000)',
    },
    danger: {
      DEFAULT: 'var(--theme-danger-main, #dc2626)',
      foreground:
        'var(--theme-danger-foreground, var(--theme-background-paper))',
    },
    neutral: {
      DEFAULT: 'var(--theme-neutral-main, var(--theme-background-default))',
      foreground: 'var(--theme-neutral-foreground, var(--theme-primary-main))',
    },
  },
  /**
   * Shared spacing scale used for both padding and margin utilities
   * (e.g. `p-md`, `px-lg`, `mt-sm`). These values are intentionally
   * conservative and map cleanly to Tailwind’s defaults.
   */
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  /**
   * Shared border radius tokens for components (e.g. `rounded-sm`,
   * `rounded-md`, `rounded-lg`). Use these instead of hard‑coded
   * radii in component classes so themes can evolve consistently.
   */
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  /**
   * Shared border width tokens used by utilities like `border`,
   * `border-2`, etc. These mirror Tailwind’s defaults so existing
   * expectations still hold.
   */
  borderWidth: {
    DEFAULT: '1px',
    0: '0px',
    2: '2px',
    4: '4px',
  },
};

module.exports = {
  defaultTailwindExtend,
};
