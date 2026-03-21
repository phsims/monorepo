// themes/tailwind-themes/registry.ts
import { cookbookTheme } from './cookbook';
import { oceanTheme } from './ocean';
import { wildflowersTheme } from './wildflowers';
import type {
  TailwindThemeDefinition,
  TailwindThemeMode,
  TailwindThemePalette,
} from './types';

export const themeRegistry: Record<string, TailwindThemeDefinition> = {
  default: cookbookTheme,
  cookbook: cookbookTheme,
  ocean: oceanTheme,
  wildflowers: wildflowersTheme,
};

export function resolveTheme(themeId?: string): TailwindThemeDefinition {
  if (!themeId) return cookbookTheme;
  return themeRegistry[themeId] ?? cookbookTheme;
}

export function resolveThemeTokens(
  themeId?: string,
  mode: TailwindThemeMode = 'light',
): TailwindThemePalette {
  const theme = resolveTheme(themeId);
  return theme.modes[mode] ?? theme.modes.light;
}
