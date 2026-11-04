# vite-react-ts-starter

[![CI](https://github.com/simerlec/vite-react-ts-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/simerlec/vite-react-ts-starter/actions/workflows/ci.yml)

A modern, minimal starter template for React and TypeScript, built with Vite, styled with Tailwind CSS and tested with Vitest. It has linting, formatting and CI set up from the start.

## Tech Stack

| Area       | Tools                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core       | [Vite 8](https://vite.dev), [React 19](https://react.dev), [TypeScript 7](https://www.typescriptlang.org)                                         |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`                                                                                 |
| Testing    | [Vitest 5](https://vitest.dev), [Testing Library](https://testing-library.com) (`react`, `dom`, `jest-dom`), jsdom                                |
| Linting    | [oxlint](https://oxc.rs/docs/guide/usage/linter) with React, JSX a11y, import, Vitest and TypeScript rules                                        |
| Formatting | [Prettier](https://prettier.io) with [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) for class sorting |
| CI         | GitHub Actions, plus Dependabot for npm packages and GitHub Actions                                                                               |

Exact versions are in [`package.json`](./package.json).

## Features

- ⚡️ Fast dev server and HMR
- 🌗 Dark mode that follows the OS setting until you choose a theme, then remembers the choice, with no flash of the wrong theme on load
- 📦 `@/` path alias, defined once in `tsconfig.json` and picked up by Vite (`resolve.tsconfigPaths`)
- 🔧 Strict TypeScript, including `noUnusedLocals`, `noUnusedParameters` and `noUncheckedIndexedAccess`
- 🧪 Vitest with Testing Library and `jest-dom` matchers, with globals enabled
- ♿️ Accessibility lint rules and an accessible theme toggle (labelled, keyboard focus ring)
- ✅ One command (`npm run test-all`) that runs the same checks locally as CI does

## Getting Started

Requires Node.js `^24.15.0` or `>=26` (CI tests both).

```bash
npm install
npm run dev
```

## Scripts

| Script               | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `npm run dev`        | Start the dev server                                          |
| `npm run build`      | Type-check with `tsc` and build for production into `dist/`   |
| `npm run serve`      | Preview the production build                                  |
| `npm test`           | Run the tests once                                            |
| `npm run test:watch` | Run the tests in watch mode                                   |
| `npm run lint`       | Lint with oxlint (`lint:quiet` shows errors only)             |
| `npm run format`     | Format with Prettier (`format:check` only checks)             |
| `npm run test-all`   | Format check, lint, type-check and build, tests: what CI runs |

## Project Structure

```
├── .github/
│   ├── workflows/ci.yml   # Runs `npm run test-all` on Node 24 and 26 for pushes to main and PRs
│   └── dependabot.yml     # Monthly npm + GitHub Actions updates
├── public/                # Static assets served as-is (favicon)
├── src/
│   ├── components/        # UI components
│   ├── hooks/             # Custom hooks (useTheme)
│   ├── icons/             # SVG icon components
│   ├── App.tsx            # Root component
│   ├── App.test.tsx       # Tests
│   ├── index.css          # Tailwind entry, dark-mode variant, theme tokens
│   └── main.tsx           # React entry point
├── index.html             # HTML entry; sets the initial theme before first paint
├── .oxlintrc.json         # Lint rules
├── .prettierrc            # Prettier config (Tailwind class sorting)
├── tsconfig.json
├── vite.config.ts         # Vite + Vitest config
└── vitest.setup.ts        # Registers jest-dom matchers
```

## Codesandbox

You can also open this template on [CodeSandbox](https://codesandbox.io/p/sandbox/github/simerlec/vite-react-ts-starter/tree/main).

## License

[MIT](./LICENSE)
