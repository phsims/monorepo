## AI agents and skills in this repo

This wiki entry describes the main AI skills configured for this monorepo and when to use each one.

### React ticket pipeline (`react-ticket-pipeline`)

- **Purpose**: End-to-end workflow for tickets that require **new or updated React UI elements**.
- **What it does**:
  - Pulls ticket details from **GitHub issues/Projects** using `gh`.
  - Creates or checks out a **feature branch** using your conventional naming: `<type>/<ticket_number>-<title>`.
  - Uses `react-atomic-components` to build/update components in `libs/components/react/{atoms,molecules,organisms}` with Tailwind and tests.
  - Runs a focused `code-review` on the changed frontend files.
  - Uses `pr-helper` to draft (and optionally create) a GitHub pull request tied to the ticket.
- **When to use**: Tickets like “add a Card atom”, “update header navigation layout”, or “add new UI for X”.

### Theme ticket pipeline (`theme-ticket-pipeline`)

- **Purpose**: End-to-end workflow for tickets that are primarily about **themes, palettes, or brand colors**, not new UI components.
- **What it does**:
  - Pulls ticket details from **GitHub** (issue/Project) via `gh`.
  - Creates or checks out a **branch** using `<type>/<ticket_number>-<title>`.
  - Uses `tailwind-themes` to create or update Tailwind themes from a **color palette** (e.g. `#A8DCAB secondary light`).
  - Updates shared theme modules under `themes/tailwind-themes/*` and app `tailwind.config.js` / Storybook wiring as needed.
  - Runs `code-review` with emphasis on **contrast, token naming, and design system consistency**.
  - Uses `pr-helper` to prepare and optionally open the PR.
- **When to use**: Tickets like “create new brand theme”, “update primary/secondary colors”, or “add a dark mode palette”.

### React atomic components (`react-atomic-components`)

- **Purpose**: Create or evolve **atomic React components** in this monorepo with consistent structure and Tailwind styling.
- **What it does**:
  - Maps atomic level (`atom`, `molecule`, `organism`) to the correct Nx library under `libs/components/react`.
  - Creates component folders with implementation, Jest/@testing-library tests, and Storybook stories.
  - Ensures imports use **path aliases** (e.g. `components/react/atoms/*`) instead of barrel exports.
- **When to use**: Any time you want a new UI building block or to refactor an existing component while following the project’s atomic design conventions.

### Tailwind themes (`tailwind-themes`)

- **Purpose**: Define and maintain **semantic Tailwind tokens** and shared themes for apps and Storybook.
- **What it does**:
  - Manages theme definitions in `themes/tailwind-themes/*` and app-level `tailwind.config.js`.
  - Accepts **palette-based input** (e.g. `#DBAAA7 primary light`) and maps it into `primary`, `secondary`, etc. with sensible foreground colors.
  - Helps align React components to use semantic classes like `bg-primary` / `text-primary-foreground` instead of hard-coded palette values.
- **When to use**: Initial theme setup, adding new named themes, or adjusting colors/tokens for existing apps.

### Frontend code review (`code-review`)

- **Purpose**: Provide a structured **frontend code review** focused on architecture, accessibility, performance, and design system compliance.
- **What it does**:
  - Applies checklists for component structure, state management, a11y, performance, and design system usage.
  - Produces review feedback grouped into **critical issues**, **important improvements**, and **nice-to-have** polish.
- **When to use**: After making frontend changes (components, themes, Storybook stories) when you want a second pair of eyes before merge or PR.

### Pull request helper (`pr-helper`)

- **Purpose**: Standardize how PRs are titled, described, and created in this repo.
- **What it does**:
  - Inspects `git` state and diffs to understand the scope of changes.
  - Derives a **PR title** using your convention, typically `feat: <ticket_number> <ticket_title>` (or `fix:` / `chore:` / `docs:` when requested).
  - Generates a structured PR body with **Summary**, **Details**, **Breaking Changes**, and **Tests** sections.
  - Uses `gh pr create` to open the PR against the default base branch, returning the PR URL.
- **When to use**: Any time you’re ready to raise a PR based on the current branch and want consistent, high-quality descriptions.
