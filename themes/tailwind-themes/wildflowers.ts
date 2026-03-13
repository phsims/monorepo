import type {
  TailwindThemeDefinition,
  TailwindThemeMode,
} from 'themes/tailwind-themes/cookbook';

/**
 * Wildflowers theme – mint, forest green, dusk pink, and lavender palette.
 * Based on issue #19 color palette for the design system.
 *
 * Palette mapping:
 * - #BE91BE (lavender purple) → primary
 * - #519755 (forest green) → secondary
 * - #DBAAA7 (dusk pink) → accent
 * - #A8DCAB (mint green) → used in light mode neutral / backgrounds
 */
export const wildflowersTheme: TailwindThemeDefinition = {
  id: 'wildflowers',
  label: 'Wildflowers',
  modes: {
    light: {
      primary: {
        DEFAULT: '#BE91BE', // lavender purple
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#519755', // forest green
        foreground: '#FFFFFF',
      },
      accent: {
        DEFAULT: '#DBAAA7', // dusk pink
        foreground: '#1f2937',
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
        DEFAULT: '#A8DCAB', // mint green – soft neutral in light mode
        foreground: '#1f2937',
      },
      background: {
        DEFAULT: '#f5f5f4',
        paper: '#FFFFFF',
      },
    },
    dark: {
      primary: {
        DEFAULT: '#a67ba6', // slightly lighter lavender for dark mode
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#66a869', // slightly lighter forest
        foreground: '#111827',
      },
      accent: {
        DEFAULT: '#c99592', // dusk pink variant
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
        DEFAULT: '#374151',
        foreground: '#f3f4f6',
      },
      background: {
        DEFAULT: '#111827',
        paper: '#1f2937',
      },
    },
  },
};
