# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` holds Next.js App Router routes, layouts, and global styles (see `src/app/globals.css`).
- `src/components/` contains reusable UI and feature components; `src/components/ui/` is shadcn/ui-based primitives.
- `src/contexts/` contains React context providers (auth, language).
- `src/lib/` provides utilities and helpers.
- `public/` stores static assets (images, icons, PWA files).

## Build, Test, and Development Commands
- `bun install` installs dependencies from `bun.lock`.
- `bun dev` starts the local dev server with Turbopack.
- `bun run build` produces a production build (this is the CI/local release gate).
- `bun start` serves the production build locally.
- `bun lint` runs Biome lint + TypeScript checks.
- `bun format` formats code with Biome.

## Coding Style & Naming Conventions
- Use TypeScript and React with functional components.
- Indentation: 2 spaces in JSON and 2 spaces in TS/TSX by convention; prefer Prettier-like formatting via Biome.
- Use `@/` path alias for imports (configured in `tsconfig.json`). Example: `import Header from "@/components/Header"`.
- Tailwind v4 is in use; global styles should include `@config` and `@import "tailwindcss"` at the top of `src/app/globals.css`.

## Testing Guidelines
- No dedicated test framework is configured in this repo.
- For changes that impact runtime behavior, validate with `bun run build` and a quick `bun dev` smoke test.

## Commit & Pull Request Guidelines
- Recent history is mixed (e.g., `fix: ...`, `Add files via upload`). Prefer short, imperative messages and optionally Conventional Commits (e.g., `fix: ...`, `feat: ...`).
- PRs should include a summary of changes, build status, and screenshots for UI changes.

## Security & Configuration Tips
- Copy `/.env.example` to `/.env.local` and populate secrets (OpenAI key, analytics ID, admin credentials).
- Do not commit real credentials or production API keys.
