# Tailwind themes

Shared semantic theme definitions for the monorepo. Each theme provides a consistent set of tokens (`primary`, `secondary`, `accent`, `success`, `warning`, `danger`, `neutral`, `background`) in both light and dark modes.

## Available themes

| Theme           | Id            | Purpose                                                                                         |
| --------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| **Cookbook**    | `cookbook`    | Recipe Companion / warm palette (orange, green, yellow). Default for CookbookKeeper.            |
| **Ocean**       | `ocean`       | Cool blue/teal palette. Alternative for design-system demos and apps that need a distinct look. |
| **Wildflowers** | `wildflowers` | Mint, forest green, dusk pink, lavender. Palette: #A8DCAB, #519755, #DBAAA7, #BE91BE.           |

## Usage

### In an app

1. Use `defaultTailwindExtend` from `themes/tailwind-themes/default.js` in your app’s `tailwind.config.js` so classes like `bg-primary` and `text-primary-foreground` resolve to CSS variables.
2. Set the active theme by applying the desired theme’s tokens to CSS variables (e.g. at `:root` or `[data-theme="…"]`). See the design-system Storybook preview for the variable names and pattern.

### In Storybook (design-system)

The design-system app’s Storybook is wired to these themes. Use the **Theme** toolbar (paintbrush icon) to switch between **Default** (Cookbook), **Cookbook**, **Ocean**, and **Wildflowers**. Use **Mode** to toggle light/dark. Component stories (Button, Card, Chip, etc.) use semantic tokens (`bg-primary`, `text-primary-foreground`, `bg-secondary`, etc.) and will reflect the selected theme.

### Adding a new theme

1. Add a new file under `themes/tailwind-themes/<name>.ts` following the shape of `cookbook.ts` (export a `TailwindThemeDefinition` with `id`, `label`, and `modes.light` / `modes.dark`).
2. Register the theme in `apps/design-system/.storybook/preview.ts` (import it, add to `themeRegistry`, and add a toolbar item).
3. Add the theme file to `apps/design-system/tsconfig.storybook.json` `include` if needed for type-checking.
4. Document the theme in this README.
