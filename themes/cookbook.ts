export type ThemeMode = 'light' | 'dark';

export interface ThemePalette {
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
  };
  background: {
    default: string;
    paper: string;
  };
}

export interface ThemeDefinition {
  /**
   * Stable identifier for this theme.
   */
  id: string;
  /**
   * Human‑readable label for UIs like pickers.
   */
  label: string;
  /**
   * Palette variants for light and dark modes.
   */
  modes: Record<ThemeMode, ThemePalette>;
}

/**
 * First shared theme, based on the Recipe Companion MUI theme palette.
 * Can be imported by any app as a central source of brand colors.
 */
export const cookbookTheme: ThemeDefinition = {
  id: 'cookbook',
  label: 'Cookbook',
  modes: {
    light: {
      primary: {
        main: '#FF5E28',
        light: '#FDD100',
        dark: '#D44429',
      },
      secondary: {
        main: '#528E2A',
        light: '#528E2A',
        dark: '#014A3F',
      },
      background: {
        default: '#FAFAFA',
        paper: '#FFFFFF',
      },
    },
    dark: {
      // Start with similar brand colors but on a dark background.
      primary: {
        main: '#FF7840',
        light: '#FF9A66',
        dark: '#D44429',
      },
      secondary: {
        main: '#7BBF4A',
        light: '#9AD667',
        dark: '#35611B',
      },
      background: {
        default: '#111827',
        paper: '#020617',
      },
    },
  },
};

