# Libraries

This page lists the shared libraries in the monorepo and what they are used for.

## Current libs

| Lib                  | Path                    | Purpose                                                                                                                                                                                                                                                                                        |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **react-components** | `libs/components/react` | Shared React UI components built with atomic design (atoms, molecules, organisms). Includes Button, Card, Chip, Icon, Input, Header, and others. Styled with Tailwind and used by apps such as CookbookKeeper and design-system. Import via path aliases (e.g. `components/react/atoms/*`).    |
| **spoonacular-api**  | `libs/api/spoonacular`  | Client for the [Spoonacular Food API](https://spoonacular.com/food-api). Provides typed methods for random recipes, recipe details, and similar recipes. Intended for server-side use; pass the API key at construction (e.g. from environment variables). Used by apps that need recipe data. |

## Where they live

- **UI / components** → `libs/components/react` (single lib with `src/lib/atoms/`, `src/lib/molecules/`, `src/lib/organisms/`).
- **API clients** → `libs/api/*` (one lib per API or domain).

To see all Nx projects (including apps), run:

```bash
pnpm exec nx show projects
```
