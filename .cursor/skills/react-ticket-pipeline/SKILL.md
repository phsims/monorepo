---
name: react-ticket-pipeline
description: >
  Orchestrate a full frontend ticket workflow in this monorepo by (1) pulling ticket details from GitHub,
  (2) implementing React UI using react-atomic-components, (3) running a structured frontend code-review,
  and (4) creating a GitHub pull request with pr-helper. Use when working from GitHub tickets/projects
  and you want the agent to handle the end-to-end flow.
---

# React Ticket Pipeline

## When to Use This Skill

Use this skill whenever the user wants an **end-to-end pipeline** for a frontend ticket in this monorepo:

- Start from a **GitHub ticket** (issue or a card in a GitHub Project that links to an issue).
- Implement or update **React components** in the single lib `libs/components/react` (atoms, molecules, organisms as folders under `src/lib/`) using atomic design.
- Run a **structured frontend code review** on the changes.
- Open a **GitHub pull request** with a clear title and body tied to the ticket.

This skill **does not replace** the other skills. Instead, it **orchestrates**:

- `react-atomic-components` for implementation.
- `code-review` for review.
- `pr-helper` for PR creation.

## Inputs You Should Gather

Always collect or infer the following:

1. **Ticket reference** (at least one of):
   - GitHub issue URL, e.g. `https://github.com/org/repo/issues/123`.
   - Issue number (and implicitly the current repo), e.g. `123`.
   - A branch name that encodes the ticket, e.g. `feature/ABC-123-add-card-component`.
   - A GitHub Project card link that ultimately points to an issue.
2. **High-level goal in the user’s words**:
   - What UI or flow they expect (e.g. “new Card atom for product tiles in design-system app”).
3. **Target area (optional but helpful)**:
   - App or domain (e.g. `design-system`, `web`, etc.).
   - Expected atomic level (`atom`, `molecule`, `organism`) if the user already knows it.

If some details are missing, make reasonable assumptions and clearly state them when summarizing back to the user.

## Step 0 – Sync with main

Before fetching the ticket or creating a branch:

1. **Checkout main**: run `git checkout main` (or the repo’s default branch if different).
2. **Pull latest**: run `git pull` (or `git pull origin main` if needed) so the pipeline starts from an up-to-date base.

If the user is already on a feature branch they want to continue, you may skip this step and state that you are building on the current branch.

## Step 1 – Fetch Ticket Details from GitHub

When the user provides a ticket reference, try to **pull canonical details from GitHub first**:

1. **If given an issue URL or number** and `gh` CLI is available and authenticated:
   - Use `Shell` with `gh issue view` (adjust `--repo` if needed) to get at least:
     - `number`, `title`, `body`, and `url`.
   - Treat the **issue title** and **body** as the authoritative description of the ticket.
2. **If given only a branch name**:
   - Parse the branch for a ticket key or number if present (e.g. `ABC-123` or `123`).
   - If you can infer an issue number, use `gh issue view` as above.
3. **If the ticket lives only as a Project card**:
   - Prefer to resolve the underlying issue (most cards point at issues).
   - If you cannot reliably resolve an issue, rely on the user’s description instead.

If `gh` is not configured or the issue cannot be found:

- Explain the limitation to the user briefly.
- Ask them to **paste the ticket title and key requirements**, then continue the pipeline using that text as the ticket source.

## Step 2 – Clarify and Translate Ticket into Work

Based on the ticket text (from GitHub or the user), quickly:

1. Extract the **core UI requirements**:
   - New components to add or existing components to change.
   - Expected behavior, states, and any key variants.
2. Decide or confirm:
   - **Atomic level** for each component (`atom`, `molecule`, `organism`).
   - Which **folder** in `libs/components/react` is affected (`src/lib/atoms/`, `src/lib/molecules/`, or `src/lib/organisms/`).
3. Summarize back to the user in a few bullets:
   - What you will build or change.
   - Which components lib (and which atomic folder) you will touch.

## Step 2.5 – Create Branch Using Conventional Commits Format

When a new branch is needed for this ticket (and the user has not already created one), create it using this **conventional-commit-style branch naming convention**:

- **Format**: `<type>/<ticket_number>-<title>`
- Examples:
  - `feat/ABC-123-add-card-component`
  - `fix/ABC-456-fix-card-padding`
  - `chore/ABC-789-update-dependencies`
  - `docs/ABC-101-update-readme`

Follow these rules:

1. **Determine `<type>` from ticket tags/labels**:
   - If the ticket has a label that maps clearly to one of:
     - `bug` → `fix`
     - `feature` → `feat`
     - `chore` → `chore`
     - `documentation` / `docs` → `docs`
   - If multiple such labels exist, pick the **most specific** (e.g. `bug` over `feature`).
   - If no matching label exists, ask the user which type to use (or, if they previously specified a default, apply that).
2. **Determine `<ticket_number>`**:
   - Prefer an explicit key from the ticket or branch name (e.g. `ABC-123`).
   - If only a GitHub issue number is available, use the issue number as the ticket identifier (e.g. `35` for issue #35). Do not prefix with `GH-`.
3. **Determine `<title>`**:
   - Start from the GitHub issue title or the user-provided ticket title.
   - Convert to **kebab-case**, removing or simplifying punctuation (e.g. `Add Card component` → `add-card-component`).
4. **Only create a new branch when needed**:
   - If the user is already on a branch that clearly matches this format and ticket, continue using it.
   - Do not rename existing branches unless the user explicitly asks you to.

When actually creating the branch, use `git checkout -b <type>/<ticket_number>-<title>` via `Shell`, and mention the final branch name in your update back to the user.

If scope is ambiguous in a way that could cause wasted work, ask **one focused follow-up question** rather than many.

## Step 3 – Implement UI with `react-atomic-components`

For the implementation phase:

1. **Follow the `react-atomic-components` skill** for all component work:
   - Use the single lib `libs/components/react` with the correct folder per atomic level:
     - Atoms: `libs/components/react/src/lib/atoms/`
     - Molecules: `libs/components/react/src/lib/molecules/`
     - Organisms: `libs/components/react/src/lib/organisms/`
   - Use folder-per-component structure within each atomic folder (`src/lib/atoms/<component-name>/...`, etc.).
   - Create or update:
     - Component implementation (`*.tsx`).
     - Tests (`*.spec.tsx`) with `@testing-library/react`.
     - Storybook stories (`*.stories.tsx`) when appropriate.
   - Use Tailwind classes and existing theme tokens where possible.
2. Keep the implementation **aligned with the ticket**:
   - Match names and wording to the ticket when reasonable.
   - Note any assumptions or deliberate deviations.
3. After making changes, summarize:
   - Which components were created or updated.
   - Any important behavior/variants that map directly to ticket requirements.

## Step 4 – Run a Frontend Code Review with `code-review`

Once implementation changes are in place:

1. Use `git diff` (via `Shell`) to identify the **changed frontend files**.
2. Apply the `code-review` skill’s checklists to those files:
   - **Architecture and code structure**
   - **Accessibility (a11y)**
   - **Performance**
   - **Design system and UI consistency**
3. Provide review feedback using the `code-review` feedback template:
   - `### Summary`
   - `### Critical issues (must fix)`
   - `### Important improvements`
   - `### Nice-to-have / polish`
4. If you find critical issues:
   - Propose concrete changes and, when you are implementing directly, go ahead and apply them.
   - Re-run a quick mental pass of the checklist after fixes.

The goal is that by the time you reach the PR step, the code is already in a **review-ready** state.

## Step 5 – Create PR with `pr-helper`

When the changes are ready:

1. Ensure the **working tree** is clean for intended changes:
   - Use `git status -sb` via `Shell`.
   - If there are uncommitted but relevant changes, help stage and commit them as needed (respecting user instructions).
2. Derive **PR title ticket_number and ticket_title** from the GitHub ticket:
   - Prefer using any explicit ticket key (e.g. `ABC-123`) present in:
     - Issue title.
     - Branch name.
     - User-provided context.
   - If there is no such key, use the issue number as the ticket identifier (e.g. `35`). Do not prefix with `GH-`.
   - Use the GitHub issue title (possibly lightly shortened) as `<ticket_title>`.
3. Call the `pr-helper` workflow:
   - Follow its rule to format the title: `feat: <ticket_number> <ticket_title>` (or `fix:` / `chore:` if the user specifies).
   - Derive the PR body sections:
     - **Summary** and **Details** from the ticket plus your implementation summary.
     - **Breaking Changes** (usually “No” for UI components unless otherwise specified).
     - **Tests** based on which tests you added or ran.
4. If the user wants an actual PR created:
   - Use `gh pr create` via `Shell` as described in `pr-helper`.
   - Return the PR URL and a very short recap of what the PR contains.

If the user only wants the **text** of the PR (for manual use in their tooling), just return the proposed title and body.

## Communication Back to the User

Throughout the pipeline:

1. Keep updates **short and concrete**, especially after each major step:
   - After fetching the ticket: what you learned from GitHub.
   - After implementation: which components you touched.
   - After review: any critical or notable issues and whether they are fixed.
   - After PR: final title and link (or the PR text).
2. Clearly **surface assumptions**:
   - Ticket key derivation (e.g. using `123` from issue `#123`).
   - Any interpretation of vague requirements.
3. If any automation step (especially GitHub CLI calls) fails:
   - Explain in plain language what likely went wrong.
   - Suggest the minimal next action for the user (e.g. authenticate `gh`, provide an issue URL, or paste ticket text).

This skill’s purpose is to give the user a **one-phrase entry point** (“run the React ticket pipeline for this GitHub ticket”) while still leveraging the detailed workflows defined in `react-atomic-components`, `code-review`, and `pr-helper`.
