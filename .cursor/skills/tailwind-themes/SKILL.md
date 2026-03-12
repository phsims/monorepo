---
name: tailwind-themes
description: >
  Standardize and manage Tailwind CSS themes for apps and shared UI components in this monorepo.
  Use when initializing or updating Tailwind theme tokens (e.g. primary, secondary, success, danger)
  for one or more apps, or when adding additional named themes that share a common token structure.
---

# Tailwind Themes for This Monorepo

## When to Use This Skill

Use this skill whenever you need to:

- Define or update **Tailwind theme tokens** such as `primary`, `secondary`, `accent`, `success`, `warning`, `danger`, and `neutral`.
- Configure **one or more app-level themes** that share the same token names but different color values.
- Ensure Tailwind config, PostCSS wiring, and React components (including those in `libs/components/react`) all use a **consistent theme structure**.

This skill is currently based on the Tailwind setup in `apps/CookbookKeeper` and is intended to scale to other apps as they are added.

## Target Files and Locations

- App Tailwind config: `apps/<AppName>/tailwind.config.js`
- App PostCSS config: `apps/<AppName>/postcss.config.js`
- Shared React components:
  - Atoms: `libs/components/react/atoms`
  - Molecules: `libs/components/react/molecules`
  - Organisms: `libs/components/react/organisms`
- Storybook for components:
  - Config: `apps/design-system/.storybook/main.ts`
  - Preview setup: `apps/design-system/.storybook/preview.ts`

Always verify actual paths with `Glob` or `Read` before editing.

## Theme Model

### 1. Core Tokens

For each app, define a **single source of truth** for semantic color tokens in the Tailwind `theme.extend.colors` section.

Target a structure like:

```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '...',
        foreground: '...',
      },
      secondary: {
        DEFAULT: '...',
        foreground: '...',
      },
      accent: {
        DEFAULT: '...',
        foreground: '...',
      },
      success: {
        DEFAULT: '...',
        foreground: '...',
      },
      warning: {
        DEFAULT: '...',
        foreground: '...',
      },
      danger: {
        DEFAULT: '...',
        foreground: '...',
      },
      neutral: {
        DEFAULT: '...',
        foreground: '...',
      },
    },
  },
}
```

- `DEFAULT` is the main color value used by classes like `bg-primary`, `text-secondary`, etc.
- `foreground` is the preferred contrasting text color for that token.

### 2. Optional Theme Variants (Per App)

If an app needs multiple named themes (for example `light` and `dark`), keep a **single semantic token set** and express variants via:

- CSS variables (preferred) applied at the `:root` or `[data-theme="<name>"]` level, or
- Additional nested keys (e.g. `primaryLight`, `primaryDark`) **only if variables are not suitable**.

Default assumption for this skill:

- Implement a **single token set** in Tailwind.
- Use **CSS variables** and a theme wrapper component (or layout) to switch values per theme if needed.
- Keep **theme definitions app-agnostic** in a shared `themes` folder and import them into apps and Storybook.

### 3. Shared Theme Modules

This repo keeps reusable theme definitions under a root-level `themes` folder with a TypeScript path alias:

- Path alias in `tsconfig.base.json`:

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "themes/*": ["themes/*"]
      }
    }
  }
  ```

- Example shared Tailwind theme file: `themes/tailwind-themes/cookbook.ts`
  - Exports a `cookbookTheme` with both `light` and `dark` modes using Tailwind-style semantic tokens:

    ```ts
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
      background: { DEFAULT: string; paper: string };
    }
    ```

  - Can be imported from any app or Storybook config with:

    ```ts
    import { cookbookTheme } from 'themes/tailwind-themes/cookbook';
    ```

- Default Tailwind extension: `themes/tailwind-themes/default.js`
  - Exports `defaultTailwindExtend` for use in `theme.extend`:

    ```js
    const { defaultTailwindExtend } = require('../themes/tailwind-themes/default');

    module.exports = {
      theme: {
        extend: {
          ...defaultTailwindExtend,
        },
      },
    };
    ```

Use this pattern for additional themes: add `themes/tailwind-themes/<theme-name>.ts` (or `.js`) and extend Storybook/tooling to recognize them.

## Implementation Workflow

When adding or updating themes for an app:

### Step 1: Inspect or Create App Tailwind Config

1. Use `Read` on `apps/<AppName>/tailwind.config.js`.
2. If it matches the basic Nx template (empty `extend`), evolve it to:
   - Keep the existing `content` configuration.
   - Add a `theme.extend.colors` block for the semantic tokens described above.
3. If `theme` already contains `extend.colors`, **merge** semantic tokens instead of overwriting existing keys that are in active use.

### Step 2: Define Semantic Color Tokens

1. Choose **concrete color values** (Tailwind color strings or raw hex values).
2. For consistency across apps:
   - Prefer sticking to the same **token names** in every app.
   - Reuse values where you want a shared brand identity; diverge only when the app intentionally differs.
3. When the user does not provide explicit colors:
   - Pick reasonable defaults using Tailwind’s standard palette (e.g. `blue-600` for primary, `gray-900` for neutral).
   - Clearly call out any assumptions in the explanation back to the user.

### Step 3: PostCSS Wiring

For Nx React/Next apps, each app should have:

- `apps/<AppName>/postcss.config.js` that points `tailwindcss.config` at that app’s `tailwind.config.js`.

Pattern to follow (as seen in `CookbookKeeper`):

```js
const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
```

- If this file is missing for a new app, create it using this pattern (adjust only if the repo has app-specific conventions).

### Step 4: Align React Components with Tokens

When creating or updating components that use colors (especially via the `react-atomic-components` skill):

1. Prefer **semantic classes** over direct palette values:
   - Use `bg-primary`, `text-primary-foreground`, `border-secondary`, etc.
   - Avoid hardcoding palette names like `bg-blue-600` in component code when a semantic token exists.
2. When variants are needed (e.g. primary vs secondary button):
   - Map variants to the semantic tokens rather than raw Tailwind colors.
   - Example mapping (conceptual):
     - `primary` → `bg-primary text-primary-foreground`
     - `secondary` → `bg-secondary text-secondary-foreground`
     - `danger` → `bg-danger text-danger-foreground`
3. Keep theme logic **out of the component props** unless the user explicitly wants per-component theming.

### Step 5: Supporting Additional Apps

When a new app is added and needs theming:

1. Create `apps/<NewApp>/tailwind.config.js` by:
   - Copying the `content` and `theme.extend.colors` structure from an existing app (e.g. `CookbookKeeper` once it has tokens defined).
   - Adjusting semantic token values only where the new app should differ.
2. Ensure `apps/<NewApp>/postcss.config.js` exists and is wired like the example above.
3. If shared components in `libs/components/react` are used by the new app:
   - Reuse the same token names so components behave consistently across apps.

## Example Tailwind Theme for an App

Below is an example of how to evolve an Nx app Tailwind config toward this pattern.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#64748b', // slate-500
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f97316', // orange-500
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#16a34a', // green-600
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#eab308', // yellow-500
          foreground: '#000000',
        },
        danger: {
          DEFAULT: '#dc2626', // red-600
          foreground: '#ffffff',
        },
        neutral: {
          DEFAULT: '#111827', // gray-900
          foreground: '#f9fafb',
        },
      },
    },
  },
  plugins: [],
};
```

- This is a **starting point**; update values to match your brand or app design as needed.

## Storybook Integration for Themes

To see and test themes in Storybook (design-system app), follow this pattern.

### 1. Ensure Tailwind is Loaded in Storybook

1. Make sure `apps/design-system/src/styles.css` (or equivalent) imports Tailwind base, components, and utilities, for example:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Ensure Storybook’s Vite config (in `apps/design-system/.storybook/main.ts`) already works with the app’s Vite/Tailwind setup (Nx’s default configuration with `react` and `nxViteTsPaths` is sufficient).

### 2. Shared Themes in Storybook

Use Storybook’s `globalTypes` and `decorators` together with the shared `themes/*` modules to control both the active theme and light/dark mode.

Current implementation in `apps/design-system/.storybook/preview.ts`:

```ts
import React from 'react';
import type { Preview } from '@storybook/react';
import {
  cookbookTheme,
  type TailwindThemeMode,
  type TailwindThemePalette,
} from 'themes/tailwind-themes/cookbook';
import '../src/styles.css';

export const globalTypes = {
  themeMode: {
    name: 'Mode',
    description: 'Light or dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Shared UI theme',
    defaultValue: 'cookbook',
    toolbar: {
      icon: 'paintbrush',
      items: [{ value: 'cookbook', title: 'Cookbook' }],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const mode = (context.globals.themeMode as TailwindThemeMode) || 'light';
      const themeId = (context.globals.theme as string) || 'cookbook';
      const themeDef = themeId === cookbookTheme.id ? cookbookTheme : cookbookTheme;
      const tokens: TailwindThemePalette = themeDef.modes[mode];

      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.setAttribute('data-theme', mode);
        root.setAttribute('data-theme-id', themeDef.id);

        root.style.setProperty('--theme-primary-main', tokens.primary.DEFAULT);
        root.style.setProperty(
          '--theme-primary-foreground',
          tokens.primary.foreground
        );
        root.style.setProperty('--theme-primary-light', tokens.accent.DEFAULT);
        root.style.setProperty(
          '--theme-primary-light-foreground',
          tokens.accent.foreground
        );
        root.style.setProperty('--theme-secondary-main', tokens.secondary.DEFAULT);
        root.style.setProperty(
          '--theme-secondary-foreground',
          tokens.secondary.foreground
        );
        root.style.setProperty('--theme-success-main', tokens.success.DEFAULT);
        root.style.setProperty(
          '--theme-success-foreground',
          tokens.success.foreground
        );
        root.style.setProperty('--theme-warning-main', tokens.warning.DEFAULT);
        root.style.setProperty(
          '--theme-warning-foreground',
          tokens.warning.foreground
        );
        root.style.setProperty('--theme-danger-main', tokens.danger.DEFAULT);
        root.style.setProperty(
          '--theme-danger-foreground',
          tokens.danger.foreground
        );
        root.style.setProperty('--theme-neutral-main', tokens.neutral.DEFAULT);
        root.style.setProperty(
          '--theme-neutral-foreground',
          tokens.neutral.foreground
        );
        root.style.setProperty(
          '--theme-background-default',
          tokens.background.DEFAULT
        );
        root.style.setProperty('--theme-background-paper', tokens.background.paper);
      }

      return React.createElement(
        'div',
        {
          style: {
            minHeight: '100vh',
            backgroundColor: tokens.background.DEFAULT,
          },
        },
        React.createElement(Story, context.args)
      );
    },
  ],
};

export default preview;
```

- `themeMode` controls the **light/dark** mode.
- `theme` controls which shared Tailwind theme module is active (currently only `cookbook`, but you can add more under `themes/tailwind-themes/*` and extend the toolbar).
- The decorator exposes semantic Tailwind tokens as CSS variables and sets the Storybook preview background based on the active theme/mode.

### 3. Align Themes with CSS Variables (Optional but Recommended)

If you use `data-theme` (as above), define CSS variables for each semantic token and have Tailwind read from them.

Example in a global CSS file:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;
  /* ...other tokens... */
}

[data-theme='dark'] {
  --color-primary: #1d4ed8;
  --color-primary-foreground: #e5e7eb;
  /* ...override tokens for dark theme... */
}
```

Then in Tailwind config, map tokens to variables:

```js
extend: {
  colors: {
    primary: {
      DEFAULT: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
    },
    // ...other tokens...
  },
},
```

Storybook will then reflect theme changes whenever the toolbar selection changes.

## Communication Back to the User

After using this skill to update themes:

1. **Summarize changes succinctly**:
   - Mention which app(s) had their `tailwind.config.js` updated.
   - Note that semantic tokens like `primary`, `secondary`, `success`, and `danger` were added or adjusted.
2. **Highlight usage**:
   - Provide a short example of using the tokens in JSX, e.g. `className="bg-primary text-primary-foreground"`.
3. **Call out assumptions**:
   - If you chose default colors or a particular token mapping without explicit user input, mention those assumptions so they can be tweaked later.

