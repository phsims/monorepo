## CookbookKeeper Wiki

Welcome to the **CookbookKeeper** wiki. This wiki is generated automatically from documentation in the main repository and is intended as the human-friendly entry point for:

- Understanding how to work with this monorepo
- Discovering the AI agents and skills available in this project
- Navigating to more focused documentation pages (themes, components, pipelines, etc.)

### Getting started with the repo

If you are new to this workspace:

- Start with the repository `README.md` for Nx-specific details and CLI commands.
- Use `npx nx graph` to visualize the project structure.
- Explore the `apps/` and `libs/` folders to see where applications and shared libraries live.

### AI agents and skills

The project is configured with several AI-driven workflows and skills that help automate common tasks:

- See the **AI agents and skills** page (`docs/agents.md` in the repo, mirrored under `docs/agents.md` in the wiki) for:
  - Ticket-driven UI implementation flows
  - Theme-focused pipelines
  - Frontend code review helpers
  - Pull request automation helpers

These agents are the recommended way to implement and review frontend work in this monorepo.

### Tailwind themes

Theme tokens and shared color systems are defined under `themes/tailwind-themes` in the repo.

- The **Tailwind themes** wiki page (`Tailwind-themes.md`) is generated from `themes/tailwind-themes/README.md`.
- Use it to understand:
  - How semantic tokens like `primary`, `secondary`, and `danger` are defined
  - How themes are shared between apps and Storybook
  - How to add or update themes via the theme-related agents

### Docs and reference pages

Additional documentation lives in the `docs/` folder in the repository and is mirrored to the wiki under `docs/`:

- `docs/agents.md` – AI agents and skills overview
- `docs/libs.md` – List of shared libraries and what they do
- `docs/wiki-sync.md` – How the docs → wiki synchronization works
- Any future docs you add under `docs/**` will automatically appear in the wiki.

### How this wiki is maintained

This wiki is **read-only** from GitHub’s wiki UI perspective — edits should be made in the main repository:

- Documentation sources live in the repo (`README.md`, `docs/**`, and `**/README.md`).
- The **Sync docs to GitHub Wiki** GitHub Actions workflow pushes changes into the wiki repo on:
  - Pushes to `main` that touch docs
  - Manual runs from the Actions tab

For details, see the `docs/wiki-sync.md` page in the repo or in the wiki.
