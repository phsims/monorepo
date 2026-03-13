---
name: code-review
description: Review frontend code for architecture, accessibility, performance, and design system compliance. Use when reviewing React or other UI code, pull requests, or when the user asks for a frontend code review.
---

# Frontend Code Review

## Quick start

When using this skill to review frontend changes:

1. Identify the scope of the change (files, features, user flows).
2. Read any related context (design specs, tickets, docs) if available.
3. Review the code using the checklists below (architecture, accessibility, performance, design system).
4. Summarize findings with clear priorities and concrete suggestions.

Keep feedback concise, actionable, and tied to specific files or components.

## Review dimensions and checklists

### 1. Architecture and code structure

Check that:

- Components have clear responsibilities and reasonable size.
- State is colocated appropriately and avoids unnecessary global or top-level state.
- Props and data flow are simple and predictable (avoid deeply nested prop drilling where better patterns exist).
- Side effects (data fetching, subscriptions, timers) are isolated and cleaned up correctly.
- Reusable logic is extracted (custom hooks, helpers, utilities) instead of duplicated.
- Routing, layout, and feature boundaries follow project conventions.
- Error and loading states are handled consistently.

### 2. Accessibility (a11y)

Check that:

- Semantic HTML elements are used instead of generic `div`/`span` where possible.
- Interactive elements are keyboard accessible (focusable, operable via keyboard alone).
- Focus management is correct (initial focus, focus trap for dialogs, returning focus on close).
- ARIA attributes are used only when necessary and applied correctly (roles, `aria-*`).
- Form fields have associated labels and helpful error messaging for validation states.
- Color contrast meets accessibility guidelines for text, icons, and key UI elements.
- Motion, animations, and auto-updating content respect user preferences (e.g. reduced motion).

### 3. Performance

Check that:

- Expensive computations are memoized where appropriate and not re-run on every render.
- Large lists or heavy UIs use virtualization or pagination when necessary.
- Components avoid unnecessary re-renders (stable props, keys, memoization, dependency arrays).
- Network requests are batched, cached, or de-duplicated when feasible.
- Images, fonts, and other assets are optimized (sizes, formats, lazy loading).
- Lazy loading or code splitting is used for heavy routes or feature modules where appropriate.
- Event handlers avoid tight loops or unnecessary work on high-frequency events (scroll, resize, mousemove).

### 4. Design system and UI consistency

Check that:

- Shared design system components are used instead of ad hoc HTML/CSS when available.
- Tokens for colors, spacing, typography, and radii are used instead of hard-coded values.
- Variants, sizes, and states (hover, active, focus, disabled, loading) match the design system.
- Layout, grid, and spacing follow project conventions and feel consistent across screens.
- Responsiveness is handled appropriately (breakpoints, fluid layouts, touch targets).
- Dark mode or theming is respected when the app supports it.
- Visual regressions are unlikely (consider snapshot tests, visual QA, or storybook stories if in use).

## Review workflow

When performing a review with this skill:

1. List the main areas you inspected (architecture, a11y, performance, design system).
2. Call out any blocking issues that must be fixed before merge.
3. Call out important but non-blocking improvements that should be addressed soon.
4. Note any small polish or refactor opportunities that can be deferred.
5. Where useful, include small code snippets or pseudo-diffs to illustrate suggested changes.

Prefer fewer, well-explained points over many vague comments.

## Feedback format

Provide feedback grouped by priority and area. Use this template:

```markdown
### Summary

- Overall assessment in 2–4 sentences.

### Critical issues (must fix)

- [Area: Architecture/Accessibility/Performance/Design system] Short description and why it matters.

### Important improvements

- [Area] Short description and suggested improvement.

### Nice-to-have / polish

- [Area] Short description and optional suggestion.
```

Always explain **why** a change is recommended, and when referring to project-specific conventions, mention the relevant file, pattern, or component if it is obvious from the context.
