---
name: react-atomic-components
description: >
  Automate creating React UI components using atomic design in this monorepo. Use when the user wants
  to create an atom, molecule, or organism component in the correct Nx lib under libs/components/react,
  with Tailwind styling, tests, and imports via path aliases (not barrel exports).
---

# React Atomic Components for This Monorepo

## When to Use This Skill

Use this skill whenever the user asks to:

- Create a new **atom**, **molecule**, or **organism** React component.
- Add a new UI piece following **atomic design** to the `libs/components/react` Nx libs.
- Ensure the component:
  - Lives in the correct lib (`atoms`, `molecules`, or `organisms`).
  - Uses **Tailwind CSS** classes for styling.
  - Has a **basic Jest/@testing-library** test.
  - Can be imported via the configured path aliases such as `components/react/atoms/*` rather than via a barrel file.

This skill is scoped to this repository’s structure:

- Atoms: `libs/components/react/atoms`
- Molecules: `libs/components/react/molecules`
- Organisms: `libs/components/react/organisms`

## Inputs You Should Gather

When the user wants a new component, infer or ask for:

1. **Atomic level**: `atom` | `molecule` | `organism`.
2. **Component name**: PascalCase name, e.g. `Button`, `Card`, `HeaderNav`.
3. **High-level behavior and props**:
   - Required props (e.g. `variant`, `size`, `fullWidth`, `onClick`).
   - Any default variants or states that matter for the first version.
4. **Page or design context** (optional but helpful):
   - Where it is used (page/section).
   - Any Tailwind-based visual requirements (colors, spacing, responsive behavior).

If any detail is missing, make reasonable assumptions and clearly state them in your response.

## Library Mapping (Atomic Level → Nx Lib)

Map the requested atomic level to the correct Nx lib:

- For **atoms**:
  - Lib root: `libs/components/react/atoms`
  - Source root: `libs/components/react/atoms/src`
  - Components: `libs/components/react/atoms/src/lib`
  - Import with aliases like `components/react/atoms/*` rather than relying on a barrel file.

- For **molecules**:
  - Lib root: `libs/components/react/molecules`
  - Source root: `libs/components/react/molecules/src`
  - Components: `libs/components/react/molecules/src/lib`
  - Prefer importing components via aliases like `components/react/molecules/*`.

- For **organisms**:
  - Lib root: `libs/components/react/organisms`
  - Source root: `libs/components/react/organisms/src`
  - Components: `libs/components/react/organisms/src/lib`
  - Prefer importing components via aliases like `components/react/organisms/*`.

Always verify paths with the `Glob` or `Read` tools before editing.

## Standard Component Files to Create

For a new component named `ComponentName` at a given level, follow a **folder-per-component** structure:

1. **Component implementation**
   - Folder: `<level-lib>/src/lib/component-name/`
   - File: `<level-lib>/src/lib/component-name/component-name.tsx` (kebab-case folder/filename; match existing patterns if present).
   - Contents:
     - Named React component `ComponentName`.
     - Props interface/type for the component.
     - Tailwind CSS classes used for layout, typography, and interaction states.
     - No redundant comments that just restate what code does.

2. **Component test**
   - File: `<level-lib>/src/lib/component-name/component-name.spec.tsx`.
   - Use `@testing-library/react` and Jest, matching existing tests in that lib.
   - At minimum:
     - Renders successfully.
     - Renders children/label.
     - Optionally verifies a key behavior (e.g. click handler called, variant classes applied).

3. **Storybook story**
   - File: `<level-lib>/src/lib/component-name/component-name.stories.tsx`.
   - Use CSF-style stories with `Meta` and `StoryObj` from `@storybook/react`.
   - Set the `title` to mirror the lib structure using PascalCase, for example:
     - Atoms: `React/Atoms/ComponentName`
     - Molecules: `React/Molecules/ComponentName`
     - Organisms: `React/Organisms/ComponentName`
   - Provide at least:
     - A default/primary story with typical props.
     - Additional stories for important variants (e.g. `primary`, `secondary`, `ghost`).

4. **No new barrel exports**
   - Do **not** add new exports to `<level-lib>/src/index.ts` for these components.
   - Components are intended to be imported directly via path aliases such as `components/react/atoms/component-name`.

## Implementation Workflow (Step-by-Step)

When creating a new component, follow this workflow:

1. **Determine target lib**
   - Based on atomic level (`atom`, `molecule`, `organism`), select the correct lib paths as described above.

2. **Inspect existing patterns (if any)**
   - Use `Read` on an existing lib file, such as:
     - `libs/components/react/atoms/src/lib/react-atoms.tsx`
     - `libs/components/react/molecules/src/lib/react-molecules.tsx`
     - `libs/components/react/organisms/src/lib/react-organisms.tsx`
   - Mirror:
     - Import style (`import` order, type usage).
     - Testing setup (testing library, Jest patterns).

3. **Design the component API**
   - Define a clear props interface.
   - Use appropriate HTML element types (e.g. `button`, `input`, `div`, `nav`).
   - Prefer extending the relevant intrinsic attributes, e.g.:
     - `ButtonHTMLAttributes<HTMLButtonElement>`
     - `HTMLAttributes<HTMLDivElement>`
   - Set sensible defaults for things like `variant`, `size`, or `fullWidth`.

4. **Implement the component with Tailwind**
   - Use Tailwind classes for:
     - Layout: `flex`, `inline-flex`, `items-center`, `justify-center`.
     - Spacing: `px-*`, `py-*`, `gap-*`, `space-*`.
     - Typography: `text-sm`, `font-medium`, `leading-*`.
     - States: `hover:*`, `focus-visible:*`, `disabled:*`.
   - Compose Tailwind classes via string concatenation or arrays joined with spaces (no external classnames helper unless it’s already in the project).

5. **Create the test file**
   - Use `render` and `screen` from `@testing-library/react`.
   - Basic test pattern:
     - Render the component with typical props.
     - Use `screen.getByRole`, `getByText`, or `getByLabelText` to assert it appears.
   - Add one or two focused tests that match the most important behavior (e.g. variant or click handler).

6. **Skip barrel export wiring**
   - Do **not** modify `src/index.ts` files in these libs for new components.
   - Assume consumers will import using the configured TypeScript path aliases such as:
     - `import { Button } from 'components/react/atoms/button';`
   - You may mention the expected alias-based import path in your response, but do not change tsconfig paths unless the user explicitly asks.

7. **Run and fix lints/tests (if asked)**
   - If the user asks to run tests or if changes are significant, use the Nx targets for the specific lib, e.g.:
     - `nx test react-atoms`
     - `nx test react-molecules`
     - `nx test react-organisms`
   - If linter errors are introduced, fix them where practical.

## Example: Creating a Button Atom

When the user asks for a `Button` atom:

1. Target lib:
   - `libs/components/react/atoms`
2. Files:
   - `libs/components/react/atoms/src/lib/button.tsx`
   - `libs/components/react/atoms/src/lib/button.spec.tsx`
   - Update `libs/components/react/atoms/src/index.ts` to export `Button`.
3. API:
   - `ButtonProps` extends `ButtonHTMLAttributes<HTMLButtonElement>`.
   - Optional props: `variant`, `fullWidth`.
4. Tailwind styling:
   - Base classes for layout, typography, transitions, focus ring, and disabled state.
   - Variant-specific classes for `primary`, `secondary`, etc.
5. Tests:
   - Verifies children render.
   - Verifies variant class present when `variant` is provided.

You may adapt this pattern for other atoms (e.g. `Input`, `Badge`), and for molecules/organisms with more complex layouts.

## Communication Back to the User

After using this skill to create or update a component:

1. **Summarize changes succinctly**:
   - Mention which lib was used (atoms/molecules/organisms).
   - List the files created/updated (without full paths when possible).
2. **Highlight usage**:
   - Show how to import the component from the appropriate lib.
   - Provide a short JSX usage snippet.
3. **Note any assumptions**:
   - If you made assumptions about variants, props, or Tailwind tokens, call them out so the user can adjust them later.

