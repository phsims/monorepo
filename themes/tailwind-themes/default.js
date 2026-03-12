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

/** @type {{ colors: Record<string, any> }} */
const defaultTailwindExtend = {
  colors: {
    primary: {
      DEFAULT: 'var(--theme-primary-main)',
      foreground: 'var(--theme-primary-foreground, var(--theme-background-paper))',
    },
    secondary: {
      DEFAULT: 'var(--theme-secondary-main)',
      foreground:
        'var(--theme-secondary-foreground, var(--theme-background-paper))',
    },
    accent: {
      DEFAULT: 'var(--theme-primary-light)',
      foreground:
        'var(--theme-primary-light-foreground, var(--theme-background-paper))',
    },
    success: {
      DEFAULT: 'var(--theme-success-main, #16a34a)',
      foreground: 'var(--theme-success-foreground, var(--theme-background-paper))',
    },
    warning: {
      DEFAULT: 'var(--theme-warning-main, #eab308)',
      foreground: 'var(--theme-warning-foreground, #000000)',
    },
    danger: {
      DEFAULT: 'var(--theme-danger-main, #dc2626)',
      foreground: 'var(--theme-danger-foreground, var(--theme-background-paper))',
    },
    neutral: {
      DEFAULT: 'var(--theme-neutral-main, var(--theme-background-default))',
      foreground: 'var(--theme-neutral-foreground, var(--theme-primary-main))',
    },
  },
};

module.exports = {
  defaultTailwindExtend,
};

