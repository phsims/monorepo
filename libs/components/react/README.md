# react-components

This library was generated with [Nx](https://nx.dev).

Shared React UI (atoms, molecules, organisms) for apps in this monorepo.

## Molecules (examples)

- **Feature Image Card** — import via `components/react/molecules/feature-image-card` (`FeatureImageCard`). Card with feature image, title, summary, metadata, and actions; used e.g. in CookbookKeeper recipe results.
- **Contact Form** — `components/react/organisms/contact-form` (`ContactForm`): configurable `fields` (default name / email / message), Turnstile, optional `heading` / `description`. POSTs arbitrary string keys + `turnstileToken` (CookbookKeeper `POST /api/contact`).

## Running unit tests

Run `nx test react-components` to execute the unit tests via [Jest](https://jestjs.io).
