import { TailwindThemeDefinition } from './types';

/**
 * Tailwind semantic theme based on the Recipe Companion palette.
 * Colors are organized as Tailwind-like tokens (DEFAULT + foreground)
 * instead of MUI's main/light/dark.
 */
export const cookbookTheme: TailwindThemeDefinition = {
  id: 'cookbook',
  label: 'Cookbook',
  modes: {
    light: {
      primary: {
        // from primary.main
        DEFAULT: '#FF5E28',
        foreground: '#FFFFFF',
        light: '#FDD100',
        dark: '#D44429',
      },
      secondary: {
        // from secondary.main
        DEFAULT: '#528E2A',
        foreground: '#FFFFFF',
        light: '#528E2A',
        dark: '#014A3F',
      },
      accent: {
        // from primary.light
        DEFAULT: '#FDD100',
        foreground: '#111827',
      },
      success: {
        DEFAULT: '#16a34a',
        foreground: '#FFFFFF',
      },
      warning: {
        DEFAULT: '#eab308',
        foreground: '#000000',
      },
      danger: {
        DEFAULT: '#dc2626',
        foreground: '#FFFFFF',
      },
      neutral: {
        // tie to background + body text
        DEFAULT: '#FAFAFA',
        foreground: '#111827',
      },
      background: {
        DEFAULT: '#FAFAFA', // from background.default
        paper: '#FFFFFF', // from background.paper
      },
    },
    dark: {
      primary: {
        // from dark primary.main
        DEFAULT: '#ff5e28',
        foreground: '#141414',
      },
      secondary: {
        // from dark secondary.main
        DEFAULT: '#69bf30',
        foreground: '#141414',
      },
      accent: {
        // from dark primary.light
        DEFAULT: '#fdd100',
        foreground: '#e2e4e9',
      },
      success: {
        DEFAULT: '#13dd5e',
        foreground: '#141414',
      },
      warning: {
        DEFAULT: '#ffcf3c',
        foreground: '#e6e6e6',
      },
      danger: {
        DEFAULT: '#e8dfdf',
        foreground: '#141414',
      },
      neutral: {
        DEFAULT: '#141414',
        foreground: '#e2e4e9',
      },
      background: {
        DEFAULT: '#141414', // from background.default
        paper: '#141414', // from background.paper
      },
    },
  },
};
