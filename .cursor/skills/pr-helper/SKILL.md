---
name: pr-helper
description: Automates creating GitHub pull requests and drafting PR titles and bodies based on git changes. Use when the user asks to open a PR, create a pull request, or write a PR description or summary.
---

# Pull Request Helper

## When to Use This Skill

Use this skill whenever you need to:

- Create or open a **GitHub pull request** (PR)
- **Write or improve** a PR title and body for the current changes
- Summarize the impact of a branch or set of commits

In this repo, when this skill runs you should **assume that an actual PR will be created via `gh pr create`**, not just that text will be drafted. Only skip calling `gh pr create` when the user **explicitly** asks for “text only” or similar.

Trigger phrases include: "open a PR", "create a pull request", "raise PR", "write PR description", "write PR message", or "PR title".

Always follow the workflow below and keep the user updated in short, concrete messages.

## Workflow

### 1. Understand Scope and Branch

1. Use the Shell tool to inspect git status and the current branch:
   - `git status -sb`
   - `git rev-parse --abbrev-ref HEAD`
2. Determine what should be included in the PR:
   - If there are unstaged changes, decide (based on the conversation) whether they belong in this PR.
   - If it is ambiguous, briefly ask the user whether to:
     - Include all changes
     - Only include already staged/committed changes
3. Do not rename or create branches unless the user explicitly requests it. Use the current branch as-is by default.

### 2. Analyze Changes for the PR

1. Use Shell to inspect diffs:
   - `git diff` for unstaged changes
   - `git diff --cached` for staged changes
   - `git log -5 --oneline` to see recent commits
2. From these, derive:
   - The **main purpose** of this PR (1–2 sentences)
   - A short list of **key changes** (e.g., features, fixes, refactors)
   - Any **breaking changes** or migrations
   - Which **tests** are added, updated, or run
3. Derive **ticket metadata and type**:
   - Infer `ticket_number` and `ticket_title` from:
     - The current branch name when it follows `<type>/<ticket_number>-<title>` (for example `feat/20-set-up-2-new-pipeline-skills-to-automate-component-and-theme-lifecycle`).
     - The conversation (the user may have already provided the ticket number and title).
   - Infer `<type>` from:
     - Branch prefix when present (`feat`, `fix`, `chore`, `docs`, etc.).
     - Ticket labels when available, mapping:
       - `bug` → `fix`
       - `feature` → `feat`
       - `chore` → `chore`
       - `documentation` / `docs` → `docs`
   - If you cannot reliably infer these values, ask the user to provide:
     - `ticket_number`
     - `ticket_title`
     - Optional `type` (default to `feat` if not specified).

This analysis will feed directly into the PR title and body.

### 3. Draft PR Title (<type>: <ticket_number> <ticket_title>)

Always use this format for the PR title:

`<type>: <ticket_number> <ticket_title>`

Where:

- `<type>` is the conventional-commit style prefix derived above (for example `feat`, `fix`, `chore`, `docs`). Default to `feat` when no better type can be inferred.
- `<ticket_number>` is the work item ID (for example `ABC-123` or `20`).
- `<ticket_title>` is a short, human-readable summary from the ticket (for example `set up 2 new pipeline skills to automate component and theme lifecycle`).

Rules:

- Do **not** include a scope in parentheses.
- Keep `<ticket_title>` concise (aim for ~60 characters or less when possible, but it may be longer if needed for clarity).
- Use sentence-style capitalization unless the team has specified a different convention in the conversation.

If the ticket information is missing or unclear:

- Try to infer `ticket_number` and `ticket_title` from:
  - The branch name (e.g. `feat/20-set-up-2-new-pipeline-skills-to-automate-component-and-theme-lifecycle`).
  - The conversation (user may have already mentioned the ticket).
- If you still cannot reliably infer them, ask the user to provide:
  - `ticket_number`
  - `ticket_title`

### 4. Draft PR Body

Use this template and fill it with concrete details from the change analysis and conversation:

```markdown
## Summary

- [1–3 bullets summarizing what this PR does]

## Details

- [Key implementation details or architectural changes]
- [Important edge cases or constraints]

## Breaking Changes

- [Yes/No] – if Yes, explain what breaks and how to migrate.

## Tests

- [ ] Unit tests
- [ ] Integration/end-to-end tests
- [ ] Manual testing

Describe what you actually tested and which areas were covered (for example “Manually tested recipe creation, editing, and deletion in CookbookKeeper app”).
```

Guidelines:

- Prefer **clear, concrete bullets** over prose paragraphs.
- Explicitly mention any new configuration, migrations, or environment changes.
- If there are **no tests**, call that out honestly rather than checking boxes.

### 5. Confirm with the User (If Needed)

By default in this repo you should **go ahead and create the PR** (step 6) after drafting the title and body, without an extra confirmation step, as long as the user has asked you to “open a PR”, “create a pull request”, etc.

Use a confirmation step only when:

- The user says they want to review or tweak the text before creation, or
- The scope of changes to include in the PR is ambiguous and needs clarification.

In that case:

- Show the **proposed PR title** and **PR body**.
- Ask whether the user wants to:
  - Accept as-is
  - Edit the title or body
  - Cancel or delay creating the PR

### 6. Create the PR via GitHub CLI

This repo’s convention is that when `pr-helper` runs, you **create the PR via `gh pr create`** (unless the user has explicitly requested “text only” output):

1. Ensure all intended changes are committed:
   - Use `git status` to confirm a clean working tree for the changes that should be in the PR.
   - If there are uncommitted changes that belong in the PR, and the user has asked to include them, help them:
     - Stage the files
     - Generate a commit message if requested
     - Commit the changes

2. Push the branch if necessary:
   - If the branch has not been pushed, run:
     - `git push -u origin HEAD`

3. Create the PR using GitHub CLI (`gh`) via Shell:
   - For a single-line body:
     - `gh pr create --title "<PR_TITLE>" --body "<PR_BODY>"`
   - For a multi-line body, prefer a heredoc: - `gh pr create --title "<PR_TITLE>" --body "$(cat <<'EOF'
<PR_BODY_CONTENT>
EOF
)"`

4. Use the repository’s default base branch unless the user specifies a different base. If a base is specified (for example `main` or `develop`), pass `--base <branch>` to `gh pr create`.

### 7. Report Back to the User

After running `gh pr create`:

1. Read the CLI output to find the created PR URL.
2. Respond to the user with:
   - The **final PR title**
   - A concise recap of the PR body (top 2–3 bullets)
   - The **PR URL**

If the CLI command fails:

- Explain in plain language what went wrong (for example authentication issues, missing `gh` CLI, no upstream branch).
- Suggest or request concrete next steps:
  - Ask the user to log in with `gh auth login` if needed.
  - Ask the user to set up the remote or confirm the correct remote name if that is the problem.

## Safety and Constraints

- Never use destructive git commands (such as `git push --force`) unless the user explicitly requests them.
- Do not change git configuration (remotes, user settings, hooks) unless explicitly instructed.
- Avoid committing secrets or environment files (for example `.env`, credential files). If such files are staged or modified, warn the user and ask how to proceed.
- Follow any project-specific commit or PR conventions mentioned in this repository or the conversation. If conventions conflict with defaults in this skill, prefer the project’s conventions.
