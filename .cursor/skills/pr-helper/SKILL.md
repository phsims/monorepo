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

This analysis will feed directly into the PR title and body.

### 3. Draft PR Title (feat: <ticket_number> <ticket_title>)

Always use this exact format for the PR title:

`feat: <ticket_number> <ticket_title>`

Where:
- `<ticket_number>` is the work item ID (for example `ABC-123`)
- `<ticket_title>` is a short, human-readable summary from the ticket (for example `add ingredient tags to recipes`)

Rules:
- Do **not** include a scope in parentheses.
- Keep `<ticket_title>` concise (aim for ~60 characters or less when possible).
- Use sentence-style capitalization unless the team has specified a different convention in the conversation.

If the ticket information is missing or unclear:
- Try to infer `ticket_number` and `ticket_title` from:
  - The branch name (e.g. `feature/ABC-123-add-ingredient-tags`)
  - The conversation (user may have already mentioned the ticket)
- If you still cannot reliably infer them, ask the user to provide:
  - `ticket_number`
  - `ticket_title`

Only deviate from the `feat:` prefix if the user explicitly instructs a different type (such as `fix:` or `chore:`) for a specific PR.

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

Before actually creating the PR:
- Show the **proposed PR title** and **PR body**.
- Ask whether the user wants to:
  - Accept as-is
  - Edit the title or body
  - Cancel or delay creating the PR

If the user has previously asked you to "just handle PRs automatically" or responds that the defaults are fine, you can skip confirmation for future PRs in this session unless requirements change.

### 6. Create the PR via GitHub CLI

When the user explicitly wants an actual PR (not just the text):

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
   - For a multi-line body, prefer a heredoc:
     - `gh pr create --title "<PR_TITLE>" --body "$(cat <<'EOF'
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

