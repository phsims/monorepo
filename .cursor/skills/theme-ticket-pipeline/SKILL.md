---
name: theme-ticket-pipeline
description: >
  Orchestrate a full theme-focused ticket workflow in this monorepo by (1) pulling ticket details from GitHub,
  (2) creating or updating Tailwind themes from a provided color palette using tailwind-themes,
  (3) running a focused frontend code-review on theme-related files, and
  (4) creating a GitHub pull request with pr-helper. Use for tickets about new themes, palettes, or brand color updates.
---

# Theme Ticket Pipeline

## When to Use This Skill

Use this skill whenever the user wants an **end-to-end pipeline** for a ticket that is primarily about:

- Creating a **new Tailwind theme** (e.g. new brand, new app theme, or new mode).
- Updating an existing theme’s **color palette** or semantic tokens.
- Wiring themes into **apps, Storybook, or shared components** without adding new UI elements.

This skill **does not replace** other skills. Instead, it **orchestrates**:

- `tailwind-themes` for theme creation and updates.
- `code-review` for reviewing theme and config changes.
- `pr-helper` for PR creation.

## Inputs You Should Gather

Always collect or infer the following:

1. **Ticket reference** (at least one of):
   - GitHub issue URL, e.g. `https://github.com/org/repo/issues/123`.
   - Issue number (and implicitly the current repo), e.g. `123`.
   - A branch name that encodes the ticket, e.g. `feature/ABC-123-new-theme`.
   - A GitHub Project card link that ultimately points to an issue.
2. **Theme scope**:
   - Which app(s) or shared layer(s) are affected (e.g. `CookbookKeeper`, `design-system`, shared `themes/tailwind-themes/*`).
3. **Color palette (preferred)**:
   - A palette expressed as lines of `hex + semantic role (+ optional shade)`, for example:
     - `#A8DCAB secondary light`
     - `#519755 secondary`
     - `#DBAAA7 primary light`
     - `#BE91BE primary`
   - Or an equivalent description in the ticket body.

If any of this is missing, ask for **the minimum clarification** needed (usually scope + palette) and then proceed.

## Step 1 – Fetch Ticket Details from GitHub

When the user provides a ticket reference, try to **pull canonical details from GitHub first**:

1. **If given an issue URL or number** and `gh` CLI is available and authenticated:
   - Use `Shell` with `gh issue view` (adjust `--repo` if needed) to get at least:
     - `number`, `title`, `body`, `url`, and `labels`.
   - Treat the **issue title** and **body** as the authoritative description of the ticket.
2. **If given only a branch name**:
   - Parse the branch for a ticket key or number if present (e.g. `ABC-123` or `123`).
   - If you can infer an issue number, use `gh issue view` as above.
3. **If the ticket lives only as a Project card**:
   - Prefer to resolve the underlying issue (most cards point at issues).
   - If you cannot reliably resolve an issue, rely on the user’s description instead.

If `gh` is not configured or the issue cannot be found:

- Explain the limitation to the user briefly.
- Ask them to **paste the ticket title, scope, and color palette**, then continue the pipeline using that text as the ticket source.

## Step 2 – Clarify Theme Work from the Ticket

From the ticket text and user input:

1. Confirm this is **theme-focused work**:
   - Look for labels like `theme`, `design-system`, `palette`, `branding`, or wording like “new theme”, “update colors”, “change palette”.
2. Extract:
   - Target app(s) or shared theme modules (`themes/tailwind-themes/*`).
   - Any explicit **palette lines** or color references.
   - Whether this is:
     - A **new theme** (e.g. new `cookbook`-like entry in `themes/tailwind-themes`).
     - A **modification** to an existing theme.
3. Summarize back to the user in a few bullets:
   - Which themes/app configs you will create or update.
   - How you will treat the palette (new theme vs update).

If the ticket scope is ambiguous enough to risk incorrect changes, ask **one focused follow-up question** (e.g. “Is this a new theme file or an update to the existing cookbook theme?”).

## Step 2.5 – Create Branch Using Conventional Commits Format

When a new branch is needed for this ticket (and the user has not already created one), create it using this **conventional-commit-style branch naming convention**:

- **Format**: `<type>/<ticket_number>-<title>`
- Examples:
  - `feature/ABC-123-new-cookbook-theme`
  - `chore/ABC-456-update-theme-tokens`
  - `documentation/ABC-789-update-theme-docs`

Follow these rules:

1. **Determine `<type>` from ticket tags/labels**:
   - Map labels to one of:
     - `bug` → `bug`
     - `feature` → `feature`
     - `chore` → `chore`
     - `documentation` / `docs` → `documentation`
   - If multiple such labels exist, pick the **most specific**.
   - If no matching label exists, ask the user which type to use (or, if they previously specified a default, apply that).
2. **Determine `<ticket_number>`**:
   - Prefer an explicit key from the ticket or branch name (e.g. `ABC-123`).
   - If only a GitHub issue number is available, you may construct a stable identifier, for example `GH-<issue_number>`.
3. **Determine `<title>`**:
   - Start from the GitHub issue title or the user-provided ticket title.
   - Convert to **kebab-case**, removing or simplifying punctuation (e.g. `New cookbook theme` → `new-cookbook-theme`).
4. **Only create a new branch when needed**:
   - If the user is already on a branch that clearly matches this format and ticket, continue using it.
   - Do not rename existing branches unless the user explicitly asks you to.

When creating the branch, use `git checkout -b <type>/<ticket_number>-<title>` via `Shell`, and mention the final branch name in your update back to the user.

## Step 3 – Apply `tailwind-themes` to Create or Update the Theme

For the implementation phase:

1. **Follow the `tailwind-themes` skill**:
   - Work primarily in:
     - `themes/tailwind-themes/<theme-name>.ts` / `.js`.
     - App-level `tailwind.config.js` under `apps/<AppName>`.
     - Related Storybook setup (`apps/design-system/.storybook/preview.ts`, `main.ts`) if needed.
2. **Use the provided color palette** where possible:
   - Parse lines like:
     - `#A8DCAB secondary light`
     - `#519755 secondary`
     - `#DBAAA7 primary light`
     - `#BE91BE primary`
   - Map to semantic tokens (`primary`, `secondary`, etc.) and, when applicable, to light variants (e.g. CSS variables such as `--theme-primary-light`).
   - Set sensible `foreground` values based on contrast when not specified.
3. **Update semantic tokens consistently**:
   - Populate or adjust `primary`, `secondary`, `accent`, `success`, `warning`, `danger`, `neutral`, and any background tokens according to the ticket.
   - Keep token names consistent across apps where shared components rely on them.
4. If the ticket calls for **adding a new theme**:
   - Add a new entry in `themes/tailwind-themes/<theme-name>.ts` (or create a new file) following the pattern used by `cookbookTheme`.
   - Wire it into Storybook or app-level theme switchers only if required by the ticket.

After changes, summarize:

1. Which theme file(s) and `tailwind.config.js` files were touched.
2. How the palette lines mapped into semantic tokens.

## Step 4 – Run a Focused Frontend Code Review with `code-review`

Once theme changes are in place:

1. Use `git diff` (via `Shell`) to identify the **changed theme-related files**:
   - `themes/tailwind-themes/*`
   - `apps/<AppName>/tailwind.config.js`
   - `apps/design-system/.storybook/*` (if modified)
2. Apply the `code-review` skill’s checklists, focusing on:
   - **Architecture**: theme structure, separation of concerns, shared vs app-specific tokens.
   - **Accessibility**: sufficient contrast for primary/secondary/neutral/background tokens.
   - **Design system consistency**: token names and usages line up with existing components and Storybook expectations.
3. Provide review feedback using the `code-review` format:
   - `### Summary`
   - `### Critical issues (must fix)`
   - `### Important improvements`
   - `### Nice-to-have / polish`
4. If you find critical issues (e.g. very low contrast, misaligned tokens):
   - Propose concrete palette/token adjustments and apply them.
   - Re-run a quick checklist after fixes.

## Step 5 – Create PR with `pr-helper`

When the theme changes are ready:

1. Ensure the **working tree** is clean for intended changes:
   - Use `git status -sb` via `Shell`.
   - If there are uncommitted but relevant changes, help stage and commit them as needed (respecting user instructions).
2. Derive **PR title ticket_number and ticket_title** from the GitHub ticket:
   - Prefer using any explicit ticket key (e.g. `ABC-123`) present in:
     - Issue title.
     - Branch name.
     - User-provided context.
   - If there is no such key, construct a stable identifier from the issue number, e.g. `GH-<issue_number>`.
   - Use the GitHub issue title (possibly lightly shortened) as `<ticket_title>`.
3. Call the `pr-helper` workflow:
   - Follow its rule to format the title: `feat: <ticket_number> <ticket_title>` (or `fix:` / `chore:` / `docs:` if the user specifies).
   - Derive the PR body sections:
     - **Summary** and **Details** from the ticket plus your theme-change summary.
     - **Breaking Changes** (e.g. if theme tokens changed in a way that may visually affect existing components).
     - **Tests** based on what you ran (e.g. Storybook visual checks, unit tests if any).
4. If the user wants an actual PR created:
   - Use `gh pr create` via `Shell` as described in `pr-helper`.
   - Return the PR URL and a concise recap of what the PR contains.

If the user only wants the **text** of the PR, return the proposed title and body for manual use.

## Communication Back to the User

Throughout the pipeline:

1. Keep updates **short and concrete**, especially after each major step:
   - After fetching the ticket: what you learned from GitHub (title, labels, palette snippets).
   - After theme updates: which theme files and tokens changed.
   - After review: any critical or notable issues and whether they are fixed.
   - After PR: final title and link (or the PR text).
2. Clearly **surface assumptions**:
   - Palette-to-token mapping decisions (which hex became `primary`, `secondary`, etc.).
   - Any contrast-driven foreground choices.
   - Any theme-scoping assumptions (e.g. “applies to CookbookKeeper only”).
3. If any automation step (especially GitHub CLI calls) fails:
   - Explain in plain language what likely went wrong.
   - Suggest the minimal next action for the user (e.g. authenticate `gh`, provide an issue URL, or paste palette text).

This skill’s purpose is to give the user a **one-phrase entry point** (“run the theme ticket pipeline for this GitHub ticket”) that handles color palettes, Tailwind/theme wiring, review, and PR creation in a consistent, repeatable way.
