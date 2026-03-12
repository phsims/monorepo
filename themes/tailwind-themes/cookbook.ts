export type TailwindThemeMode = 'light' | 'dark';

export interface TailwindSemanticColor {
  DEFAULT: string;
  foreground: string;
}

export interface TailwindThemePalette {
  primary: TailwindSemanticColor;
  secondary: TailwindSemanticColor;
  accent: TailwindSemanticColor;
  success: TailwindSemanticColor;
  warning: TailwindSemanticColor;
  danger: TailwindSemanticColor;
  neutral: TailwindSemanticColor;
  background: {
    DEFAULT: string;
    paper: string;
  };
}

export interface TailwindThemeDefinition {
  /**
   * Stable identifier for this theme.
   */
  id: string;
  /**
   * Human‑readable label for UIs like pickers.
   */
  label: string;
  /**
   * Tailwind-style semantic tokens for light and dark modes.
   */
  modes: Record<TailwindThemeMode, TailwindThemePalette>;
}

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
      },
      secondary: {
        // from secondary.main
        DEFAULT: '#528E2A',
        foreground: '#FFFFFF',
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
        DEFAULT: '#FF7840',
        foreground: '#FFFFFF',
      },
      secondary: {
        // from dark secondary.main
        DEFAULT: '#7BBF4A',
        foreground: '#111827',
      },
      accent: {
        // from dark primary.light
        DEFAULT: '#FF9A66',
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
        DEFAULT: '#111827',
        foreground: '#F9FAFB',
      },
      background: {
        DEFAULT: '#111827', // from background.default
        paper: '#020617', // from background.paper
      },
    },
  },
};

