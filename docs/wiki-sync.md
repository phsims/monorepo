## Docs → GitHub Wiki sync

This repository uses a GitHub Actions workflow to keep the GitHub Wiki in sync with the codebase documentation.

The sync is **one-way**: repository docs are treated as the source of truth, and the wiki is updated from them.

### What gets synced

- **Root README**
  - If `docs/wiki-home.md` exists, it is copied to the wiki as `Home.md` (preferred).
  - Otherwise, `README.md` is copied to the wiki as `Home.md`, becoming the wiki home page.
- **Docs directory**
  - Everything under `docs/**` is mirrored into `docs/**` in the wiki repository.
- **All README files**
  - Every `README.md` anywhere in the repo (e.g. apps, libs, themes) is copied to the same relative path in the wiki.
  - In addition, `themes/tailwind-themes/README.md` is also exposed as a top-level wiki page: `Tailwind-themes.md`.

The wiki is the standard GitHub wiki repo: `<owner>/<repo>.wiki.git`. The workflow derives this automatically from `github.repository`.

### When the workflow runs

The workflow file is `/.github/workflows/docs-sync-wiki.yml`.

It runs automatically:

- On **push to `main`** when any of these paths change:
  - `README.md`
  - `docs/**`
  - `**/README.md`

It also supports **manual runs** via the GitHub Actions UI.

### Manual sync & overwrite modes

You can trigger a sync manually from GitHub:

1. Go to **Actions** in the repo.
2. Select the **"Sync docs to GitHub Wiki"** workflow.
3. Click **"Run workflow"** (top-right).
4. Choose whether to enable **`full_overwrite`**:
   - `false` (default): Only adds/updates files. Existing wiki files that no longer exist in the repo are left as-is.
   - `true`: Performs a **full overwrite**:
     - Clears all wiki files (except `.git`).
     - Re-populates the wiki from the repo docs.

Use `full_overwrite: true` when you want to completely reset the wiki to match the current docs in the repo.

### How it works (high level)

On each run, the workflow:

1. Checks out the main repository.
2. Clones the associated wiki repo (`<owner>/<repo>.wiki.git`) into a `wiki` folder using `GITHUB_TOKEN`.
3. Optionally clears the wiki contents when `full_overwrite` is `true`.
4. Copies:
   - `docs/wiki-home.md` → `wiki/Home.md` (if present)
   - otherwise `README.md` → `wiki/Home.md`
   - `docs/**` → `wiki/docs/**`
   - all `**/README.md` → `wiki/**/README.md`
   - `themes/tailwind-themes/README.md` → `wiki/Tailwind-themes.md`
5. Commits and pushes to the wiki **only if there are actual file changes**.

The `GITHUB_TOKEN` (with `contents: write` permission) is used to push directly to the wiki repo; no extra secrets are required.

