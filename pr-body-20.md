## Summary

- Add a React ticket pipeline skill to orchestrate component work from GitHub tickets through implementation, review, and PR.
- Add a theme ticket pipeline skill to orchestrate Tailwind theme/palette changes from GitHub tickets through review and PR.
- Extend Tailwind theme tooling and docs so agents can create themes from color palettes and document all available skills.

## Details

- Introduced `react-ticket-pipeline` to combine `react-atomic-components`, `code-review`, and `pr-helper` for UI-focused tickets, including conventional branch naming based on ticket labels and numbers.
- Introduced `theme-ticket-pipeline` to combine `tailwind-themes`, `code-review`, and `pr-helper` for theme/palette-focused tickets, consuming hex-based color palettes and mapping them into semantic tokens.
- Updated `tailwind-themes` to accept palette-style input (e.g. `#A8DCAB secondary light`) and derive semantic tokens and foreground colors.
- Added `docs/agents.md` to document the main AI skills and when to use each.

## Breaking Changes

- No – changes are limited to skills configuration and documentation.

## Tests

- [ ] Unit tests
- [ ] Integration/end-to-end tests
- [x] Manual testing

Manual validation:

- Manually reviewed new skills and docs to ensure they reference the correct paths, conventions, and workflows for this monorepo.
