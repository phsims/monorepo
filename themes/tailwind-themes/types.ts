export type TailwindThemeMode = 'light' | 'dark';

export interface TailwindSemanticColor {
  DEFAULT: string;
  foreground: string;
  light?: string;
  dark?: string;
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
