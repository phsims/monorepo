import type { TailwindThemeDefinition } from './types';

/**
 * Ocean theme – cool blue/teal palette for the design system.
 * Provides a distinct alternative to the Cookbook (warm) theme.
 */
export const oceanTheme: TailwindThemeDefinition = {
  id: 'ocean',
  label: 'Ocean',
  modes: {
    light: {
      primary: {
        DEFAULT: '#0ea5e9', // sky-500
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#0d9488', // teal-600
        foreground: '#FFFFFF',
      },
      accent: {
        DEFAULT: '#38bdf8', // sky-400
        foreground: '#0f172a',
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
        DEFAULT: '#f1f5f9',
        foreground: '#0f172a',
      },
      background: {
        DEFAULT: '#f8fafc',
        paper: '#FFFFFF',
      },
    },
    dark: {
      primary: {
        DEFAULT: '#38bdf8',
        foreground: '#0f172a',
      },
      secondary: {
        DEFAULT: '#2dd4bf', // teal-400
        foreground: '#0f172a',
      },
      accent: {
        DEFAULT: '#7dd3fc', // sky-300
        foreground: '#0f172a',
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
        DEFAULT: '#0f172a',
        foreground: '#f1f5f9',
      },
      background: {
        DEFAULT: '#0f172a',
        paper: '#1e293b',
      },
    },
  },
};
